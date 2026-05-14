import { AppProvider }      from './context/AppContext'
import Topbar              from './components/Topbar'
import LandingPanel        from './components/LandingPanel'
import BottomNav           from './components/BottomNav'
import DesktopSidebar      from './components/DesktopSidebar'
import Toast               from './components/Toast'
import LandingScreen       from './components/LandingScreen'
import ModeSelectScreen    from './components/ModeSelectScreen'
import AuthView            from './views/AuthView'
import HomeView            from './views/HomeView'
import WalletView          from './views/WalletView'
import SettingsView        from './views/SettingsView'
import PrivacyView         from './views/PrivacyView'
import AccountView         from './views/AccountView'
import { useApp }          from './context/AppContext'

const NO_NAV = new Set(['auth', 'privacy', 'account'])

// ── Shared view renderer ───────────────────────────────────────────────────
function ViewContent() {
  const { state } = useApp()
  const { view } = state
  return (
    <>
      {view === 'auth'     && <AuthView />}
      {view === 'home'     && <HomeView />}
      {view === 'wallet'   && <WalletView />}
      {view === 'settings' && <SettingsView />}
      {view === 'privacy'  && <PrivacyView />}
      {view === 'account'  && <AccountView />}
    </>
  )
}

// ── Phone layout (existing) ────────────────────────────────────────────────
function PhoneScreen() {
  const { state } = useApp()
  const { view } = state
  return (
    <section className="panel-right" aria-label="SaveUpNow app preview">
      <div className="phone">
        <div className="phone-notch" aria-hidden="true" />
        <div className="screen" role="application">
          <Toast />
          <ViewContent />
          {!NO_NAV.has(view) && <BottomNav />}
        </div>
      </div>
    </section>
  )
}

// ── Desktop layout ─────────────────────────────────────────────────────────
function DesktopLayout() {
  const { state } = useApp()
  const { user } = state

  return (
    <div className="is-desktop">
      <Topbar />
      {user ? (
        /* Logged-in: sidebar + scrollable content */
        <div className="desktop-body">
          <DesktopSidebar />
          <main className="desktop-main">
            <Toast />
            <div className="desktop-content">
              <ViewContent />
            </div>
          </main>
        </div>
      ) : (
        /* Not logged in: landing panel + auth card side-by-side */
        <div className="desktop-auth-body">
          <LandingPanel />
          <div className="desktop-auth-pane">
            <Toast />
            <ViewContent />
          </div>
        </div>
      )}
    </div>
  )
}

// ── App layout (phone or desktop) ─────────────────────────────────────────
function AppLayout() {
  const { state } = useApp()
  const isDesktop = state.viewMode === 'desktop'

  if (isDesktop) return <DesktopLayout />

  return (
    <div className="phone-app">
      <Topbar />
      <main className="phone-center-layout">
        <PhoneScreen />
      </main>
    </div>
  )
}

// ── Root: landing → mode-select → app ─────────────────────────────────────
function AppRoot() {
  const { state } = useApp()
  const { appStage } = state

  if (appStage === 'landing')     return <LandingScreen />
  if (appStage === 'mode-select') return <ModeSelectScreen />
  return <AppLayout />
}

export default function App() {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  )
}
