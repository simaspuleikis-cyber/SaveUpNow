import { useApp } from '../context/AppContext'

const PHONE_ICO = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const DESKTOP_ICO = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)

const BACK_ICO = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)

const PHONE_PREVIEW = (
  <div className="ms-preview ms-preview--phone">
    <div className="ms-preview-notch" />
    <div className="ms-preview-screen">
      <div className="ms-preview-hdr" />
      <div className="ms-preview-card" />
      <div className="ms-preview-card ms-preview-card--sm" />
      <div className="ms-preview-card ms-preview-card--sm" />
    </div>
    <div className="ms-preview-nav" />
  </div>
)

const DESKTOP_PREVIEW = (
  <div className="ms-preview ms-preview--desktop">
    <div className="ms-preview-sidebar">
      <div className="ms-preview-sidebar-item ms-preview-sidebar-item--active" />
      <div className="ms-preview-sidebar-item" />
      <div className="ms-preview-sidebar-item" />
    </div>
    <div className="ms-preview-main">
      <div className="ms-preview-hdr" />
      <div className="ms-preview-grid">
        <div className="ms-preview-card" />
        <div className="ms-preview-card" />
      </div>
    </div>
  </div>
)

export default function ModeSelectScreen() {
  const { state, dispatch, setAppStage } = useApp()
  const savedMode = state.viewMode

  function chooseMode(mode) {
    localStorage.setItem('sun_view_mode', mode)
    dispatch({ type: 'SET_VIEW_MODE', mode })
    setAppStage('app')
  }

  return (
    <div className="ms-root">

      {/* Header */}
      <header className="ls-header">
        <div className="brand">
          <div className="logo">S</div>
          <div>
            <div className="brand-name">SaveUpNow</div>
          </div>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setAppStage('landing')}
          type="button"
          style={{ display: 'flex', alignItems: 'center', gap: 5 }}
        >
          {BACK_ICO} Back
        </button>
      </header>

      {/* Content */}
      <div className="ms-body">
        <div className="ms-intro">
          <div className="hero-badge" style={{ margin: '0 auto 16px' }}>
            <span className="hero-dot" />
            <span>Choose your experience</span>
          </div>
          <h2 className="ms-title">How would you like to use SaveUpNow?</h2>
          <p className="ms-sub">Pick the layout that suits you best. You can always switch using the button in the header.</p>
        </div>

        <div className="ms-cards">

          {/* Phone */}
          <button
            className={`ms-card${savedMode === 'phone' ? ' ms-card--selected' : ''}`}
            onClick={() => chooseMode('phone')}
            type="button"
          >
            {savedMode === 'phone' && <div className="ms-card-check">✓</div>}
            <div className="ms-card-preview">{PHONE_PREVIEW}</div>
            <div className="ms-card-body">
              <div className="ms-card-icon">{PHONE_ICO}</div>
              <div className="ms-card-title">Phone View</div>
              <div className="ms-card-desc">
                Classic mobile experience inside a phone frame. Compact, touch-friendly, works great at any screen size.
              </div>
              <div className="ms-card-tags">
                <span className="ms-tag">Mobile-first</span>
                <span className="ms-tag">Compact</span>
              </div>
            </div>
          </button>

          {/* Desktop */}
          <button
            className={`ms-card${savedMode === 'desktop' ? ' ms-card--selected' : ''}`}
            onClick={() => chooseMode('desktop')}
            type="button"
          >
            {savedMode === 'desktop' && <div className="ms-card-check">✓</div>}
            <div className="ms-card-preview">{DESKTOP_PREVIEW}</div>
            <div className="ms-card-body">
              <div className="ms-card-icon">{DESKTOP_ICO}</div>
              <div className="ms-card-title">Desktop View</div>
              <div className="ms-card-desc">
                Full dashboard layout with sidebar navigation and side-by-side content. Perfect for larger screens.
              </div>
              <div className="ms-card-tags">
                <span className="ms-tag">Dashboard</span>
                <span className="ms-tag">Wide screen</span>
              </div>
            </div>
          </button>

        </div>
      </div>

    </div>
  )
}
