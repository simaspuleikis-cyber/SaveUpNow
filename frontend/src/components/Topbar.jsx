import { useApp } from '../context/AppContext'
import { t } from '../i18n'

const MONITOR_ICO = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const PHONE_ICO = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

export default function Topbar() {
  const { state, showToast, logout, toggleViewMode } = useApp()
  const { lang, user, viewMode } = state

  function handleExport() {
    if (!state.transactions.length) {
      showToast('No data to export', 'info')
      return
    }
    const rows = [
      ['Date', 'Amount', 'Note'],
      ...state.transactions.map(tx => [
        new Date(tx.date).toLocaleDateString(),
        `€${tx.amount.toFixed(2)}`,
        tx.note || '',
      ]),
    ]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'saveupnow_export.csv'
    a.click()
    showToast('Exported!', 'success')
  }

  function handleReset() {
    if (window.confirm('Lock your account and return to the login screen?')) {
      logout()
    }
  }

  const isDesktop = viewMode === 'desktop'

  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo" aria-hidden="true">S</div>
        <div>
          <div className="brand-name">SaveUpNow</div>
          <div className="brand-sub">{t(lang, 'brandSub')}</div>
        </div>
      </div>

      <div className="top-actions">
        {/* View mode toggle */}
        <button
          className={`btn btn-ghost btn-sm view-toggle-btn${isDesktop ? ' view-toggle-btn--active' : ''}`}
          onClick={toggleViewMode}
          title={isDesktop ? 'Switch to phone view' : 'Switch to desktop view'}
          type="button"
        >
          <span className="view-toggle-icon">{isDesktop ? PHONE_ICO : MONITOR_ICO}</span>
          <span className="view-toggle-label">{isDesktop ? 'Phone' : 'Desktop'}</span>
        </button>

        {user && (
          <>
            <button className="btn btn-ghost btn-sm" onClick={handleExport} type="button">
              {t(lang, 'export')}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={handleReset} type="button">
              {t(lang, 'reset')}
            </button>
          </>
        )}
      </div>
    </header>
  )
}
