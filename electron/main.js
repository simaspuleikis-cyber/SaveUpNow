const { app, BrowserWindow, dialog, shell } = require('electron')
const { spawn } = require('child_process')
const path   = require('path')
const net    = require('net')

// ── Config ────────────────────────────────────────────────────────────────────
const PORT = 8731   // internal port; won't collide with anything the user has open

let mainWindow    = null
let backendProcess = null

// ── Resolve paths (works both in dev and after electron-builder packaging) ────
function backendDir() {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'backend')
    : path.join(__dirname, '..', 'backend')
}

// ── Start Python backend ──────────────────────────────────────────────────────
function startBackend() {
  const py  = process.platform === 'win32' ? 'python' : 'python3'
  const dir = backendDir()

  backendProcess = spawn(
    py,
    ['-m', 'uvicorn', 'main:app', '--host', '127.0.0.1', '--port', String(PORT)],
    {
      cwd:   dir,
      stdio: 'ignore',          // silence in production; change to 'inherit' to debug
      env:   {
        ...process.env,
        SUN_PORT:     String(PORT),
        // Persist user data in AppData, not inside the app bundle
        SUN_DATA_DIR: app.getPath('userData'),
      },
    }
  )

  backendProcess.on('error', (err) => {
    dialog.showErrorBox(
      'SaveUpNow — startup error',
      `Could not start the server.\n\nMake sure Python 3 is installed.\n\n${err.message}`
    )
    app.quit()
  })
}

// ── Wait for backend to accept connections ────────────────────────────────────
function waitForBackend(timeout = 15_000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeout
    function attempt() {
      const sock = new net.Socket()
      sock.once('connect', () => { sock.destroy(); resolve() })
      sock.once('error',   () => {
        sock.destroy()
        if (Date.now() >= deadline) {
          reject(new Error(`Backend did not start within ${timeout / 1000}s`))
        } else {
          setTimeout(attempt, 300)
        }
      })
      sock.connect(PORT, '127.0.0.1')
    }
    attempt()
  })
}

// ── Create the main app window ────────────────────────────────────────────────
function createWindow() {
  mainWindow = new BrowserWindow({
    width:     1300,
    height:    860,
    minWidth:  900,
    minHeight: 600,
    title:     'SaveUpNow',
    // Use the icon if it exists; electron-builder will embed it in the .exe anyway
    ...(process.platform === 'win32'
      ? { icon: path.join(__dirname, 'icon.ico') }
      : {}),
    backgroundColor: '#0d1117',
    show:            false,       // show only when fully loaded
    autoHideMenuBar: true,        // no browser-style menu bar
    webPreferences: {
      nodeIntegration:  false,
      contextIsolation: true,
    },
  })

  mainWindow.loadURL(`http://127.0.0.1:${PORT}`)

  // Show once the page has painted (avoids white flash)
  mainWindow.once('ready-to-show', () => mainWindow.show())

  // Open external links in the real browser, not in the app window
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.on('closed', () => { mainWindow = null })
}

// ── App lifecycle ─────────────────────────────────────────────────────────────
app.whenReady().then(async () => {
  startBackend()

  try {
    await waitForBackend()
    createWindow()
  } catch (err) {
    dialog.showErrorBox('SaveUpNow', `Failed to start: ${err.message}`)
    app.quit()
  }
})

function cleanup() {
  if (backendProcess) {
    backendProcess.kill()
    backendProcess = null
  }
}

app.on('window-all-closed', () => { cleanup(); app.quit() })
app.on('before-quit',       cleanup)
app.on('will-quit',         cleanup)
