import { useApp } from '../context/AppContext'
import { t } from '../i18n'

const HOME_ICO = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const WALLET_ICO = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)
const SETTINGS_ICO = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
)

const TABS = [
  { id: 'home',     icon: HOME_ICO,     labelKey: 'navHome' },
  { id: 'wallet',   icon: WALLET_ICO,   labelKey: 'navWallet' },
  { id: 'settings', icon: SETTINGS_ICO, labelKey: 'navSettings' },
]

export default function DesktopSidebar() {
  const { state, navigate } = useApp()
  const { view, lang, user, stats } = state
  const totalSaved = stats?.total_saved || 0
  const streak     = stats?.streak      || 0

  return (
    <aside className="desktop-sidebar">
      <nav className="sidebar-nav" aria-label="Main navigation">
        <div className="sidebar-section-lbl">Menu</div>
        {TABS.map(({ id, icon, labelKey }) => (
          <button
            key={id}
            className={`sidebar-btn${view === id ? ' sidebar-btn--active' : ''}`}
            onClick={() => navigate(id)}
            type="button"
          >
            <span className="sidebar-btn-icon">{icon}</span>
            <span className="sidebar-btn-label">{t(lang, labelKey)}</span>
          </button>
        ))}
      </nav>

      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-stats">
            <div className="sidebar-stat">
              <div className="sidebar-stat-val">€{totalSaved.toFixed(0)}</div>
              <div className="sidebar-stat-lbl">Total saved</div>
            </div>
            <div className="sidebar-stat-div" />
            <div className="sidebar-stat">
              <div className={`sidebar-stat-val${streak > 0 ? ' sidebar-stat-fire' : ''}`}>{streak}</div>
              <div className="sidebar-stat-lbl">Streak</div>
            </div>
          </div>
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {(user.name || user.card_name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-meta">
              <div className="sidebar-user-name">{user.name || user.card_name || 'User'}</div>
              <div className="sidebar-user-sub">SaveUpNow</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
