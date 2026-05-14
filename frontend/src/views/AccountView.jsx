import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

function fmtDate(iso) {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }
  catch { return '—' }
}

export default function AccountView() {
  const { state, navigate, logout } = useApp()
  const { user, lang } = state

  const [showCode,     setShowCode]     = useState(false)
  const [showLockWarn, setShowLockWarn] = useState(false)

  const archived = (() => {
    try { return JSON.parse(localStorage.getItem(`sun_goals_archived_${state.token}`) || '[]') }
    catch { return [] }
  })()

  return (
    <div className="view view-enter">

      {/* ── Header ── */}
      <div className="screen-hdr screen-hdr-grad" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="privacy-back" onClick={() => navigate('settings')} type="button" aria-label="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <div className="screen-title">{t(lang, 'accountTitle') || 'Your Account'}</div>
          <div className="screen-sub">{user?.name || ''}</div>
        </div>
      </div>

      {/* ── Profile ── */}
      <div className="card" style={{ marginTop: 10 }}>
        <h3>{t(lang, 'profileTitle') || 'Profile'}</h3>
        <div className="acct-row">
          <span className="acct-row-label">{t(lang, 'nameLabel') || 'Name'}</span>
          <span className="acct-row-val">{user?.name || '—'}</span>
        </div>
        {user?.created_at && (
          <div className="acct-row">
            <span className="acct-row-label">{t(lang, 'memberSince') || 'Member since'}</span>
            <span className="acct-row-val">{fmtDate(user.created_at)}</span>
          </div>
        )}
      </div>

      {/* ── Login & Security ── */}
      <div className="card">
        <h3>{t(lang, 'securityTitle')}</h3>

        <div className="settings-list" style={{ marginBottom: 12 }}>
          <div className="setting-item">
            <span>{t(lang, 'loginRow')}</span>
            <span className="chev">{t(lang, 'loginMethod')}</span>
          </div>
        </div>

        <div className="grid2" style={{ marginBottom: 10 }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowCode(v => !v)}
            type="button"
          >
            {showCode ? t(lang, 'hideCode') : t(lang, 'showCode')}
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setShowLockWarn(true)}
            type="button"
          >
            {t(lang, 'lock')}
          </button>
        </div>

        {showCode && (
          <>
            <div className="code-display">{state.token ?? '—'}</div>
            <div className="hint mt-sm">{t(lang, 'codeHintSecurity') || 'Your login code. Keep it private.'}</div>
          </>
        )}
      </div>

      {/* ── Age Verification ── */}
      <div className="card">
        <h3>{t(lang, 'verificationTitle') || 'Age Verification'}</h3>
        {user?.verified ? (
          <div className="verify-block verify-block-ok">
            <div className="verify-check">&#10003;</div>
            <div className="verify-text">
              <div className="verify-status-label verify-ok">{t(lang, 'verifiedStatus') || 'Verified'}</div>
              <div className="verify-desc">{t(lang, 'verifiedDesc') || 'Identity document on file. Confirmed 18+.'}</div>
            </div>
          </div>
        ) : (
          <div className="verify-block verify-block-no">
            <div className="verify-x">&#10007;</div>
            <div className="verify-text">
              <div className="verify-status-label verify-no">{t(lang, 'notVerifiedStatus') || 'Not verified'}</div>
              <div className="verify-desc">{t(lang, 'notVerifiedDesc') || 'Complete age verification to unlock all features.'}</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Completed Goals (Archive) ── */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h3>{t(lang, 'archiveTitle') || 'Completed Goals'}</h3>

        {archived.length === 0 ? (
          <p className="goals-empty">{t(lang, 'archiveEmpty') || 'No completed goals yet.'}</p>
        ) : (
          <div className="goals-list">
            {archived.map(g => (
              <div key={g.id} className="goal-item goal-item-archived">
                <div className="goal-item-left">
                  <span className="goal-archived-badge">{t(lang, 'doneBadge') || 'Done'}</span>
                  <span className="goal-item-name">{g.name}</span>
                </div>
                <div className="goal-item-right" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  <span className="goal-item-target">{g.target > 0 ? `€${g.target.toLocaleString()}` : '—'}</span>
                  {g.completedAt && (
                    <span className="goal-item-date">{fmtDate(g.completedAt)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="spacer" />

      {/* ── Lock account warning ── */}
      {showLockWarn && (
        <div className="modal-overlay" onClick={() => setShowLockWarn(false)}>
          <div className="confirm-bubble confirm-danger" onClick={e => e.stopPropagation()}>
            <div className="confirm-warn-icon">!</div>
            <div className="confirm-title">{t(lang, 'lockWarnTitle') || 'Lock account?'}</div>
            <div className="confirm-sub">{t(lang, 'lockWarnMsg') || 'You will be instantly logged out. Make sure your code is saved.'}</div>
            <div className="confirm-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setShowLockWarn(false)} type="button">
                {t(lang, 'cancel') || 'Cancel'}
              </button>
              <button className="btn btn-danger btn-sm confirm-btn-confirm" onClick={logout} type="button">
                {t(lang, 'lock')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
