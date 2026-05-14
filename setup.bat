@echo off
setlocal
set "ROOT=%~dp0"

echo.
echo  SaveUpNow — First-time setup
echo  ================================
echo.

echo [1/3] Installing Python dependencies...
pip install -r "%ROOT%backend\requirements.txt"
if errorlevel 1 (
    echo  ERROR: pip install failed. Make sure Python is installed.
    pause & exit /b 1
)

echo.
echo [2/3] Installing frontend dependencies...
cd /d "%ROOT%frontend"
npm install
if errorlevel 1 (
    echo  ERROR: npm install failed. Make sure Node.js is installed.
    pause & exit /b 1
)

echo.
echo [3/3] Building frontend...
npm run build
if errorlevel 1 (
    echo  ERROR: npm run build failed.
    pause & exit /b 1
)

echo.
echo  Setup complete!
echo  Run start.bat to launch the app, or dev.bat for hot-reload mode.
echo.
pause
