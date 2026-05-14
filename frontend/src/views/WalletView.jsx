import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

const AVATAR_COLORS = ['#4f46e5','#7c3aed','#059669','#d97706','#dc2626','#0891b2']
const COLORS = ['#4f46e5','#7c3aed','#059669','#d97706','#dc2626','#0891b2','#db2777']

function fmtDate(iso) {
  try { return new Date(iso).toLocaleDateString() } catch { return '' }
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function rankClass(i) {
  if (i === 0) return 'gold'
  if (i === 1) return 'silver'
  if (i === 2) return 'bronze'
  return ''
}

export default function WalletView() {
  const { state, updateUser, addTransaction, deleteTransaction, addFriend, deleteFriend, randomizeFriends, showToast } = useApp()
  const { user, stats, transactions, friends, lang, viewMode } = state
  const isDesktop = viewMode === 'desktop'

  // Add savings state
  const [amount,       setAmount]       = useState('')
  const [note,         setNote]         = useState('')
  const [busy,         setBusy]         = useState(false)
  const [showAddKeypad,setShowAddKeypad] = useState(false)
  const [showAll,      setShowAll]      = useState(false)

  // Friends state
  const [newFriend,  setNewFriend]  = useState('')
  const [showForm,   setShowForm]   = useState(false)
  const [friendBusy, setFriendBusy] = useState(false)

  const totalSaved = stats?.total_saved      || 0
  const thisMonth  = stats?.saved_this_month || 0

  const disposable = (user?.income || 0) - (user?.expenses || 0)
  const planAmt    = disposable > 0
    ? `€${(disposable * 0.2).toFixed(2)} ${t(lang, 'planSuffix')}`
    : t(lang, 'noDisposable')

  const amtNum = parseFloat(amount) || 0

  const displayTx = showAll ? transactions : transactions.slice(0, 5)

  // Leaderboard
  const meEntry = { id: '__me', name: user?.card_name || 'You', amount: totalSaved, isMe: true }
  const board   = [meEntry, ...friends].sort((a, b) => b.amount - a.amount)

  // Keypad for add-savings
  function handleAddKeypad(key) {
    setAmount(prev => {
      if (key === '⌫') return prev.slice(0, -1)
      if (key === '.' && prev.includes('.')) return prev
      const dot = prev.indexOf('.')
      if (dot >= 0 && prev.length - dot >= 3) return prev
      const next = prev + key
      if (next.length > 1 && next[0] === '0' && next[1] !== '.') return next.slice(1)
      return next
    })
  }

  async function handleAdd() {
    const amt = parseFloat(amount)
    if (!amt || amt <= 0) return
    setBusy(true)
    await addTransaction(amt, note)
    setAmount('')
    setNote('')
    setShowAddKeypad(false)
    setBusy(false)
  }

  async function handleAddFriend() {
    if (!newFriend.trim()) return
    setFriendBusy(true)
    await addFriend(newFriend.trim())
    setNewFriend('')
    setShowForm(false)
    setFriendBusy(false)
  }

  return (
    <div className="view view-enter">
      <div className="screen-hdr screen-hdr-grad">
        <div className="screen-title">{t(lang, 'walletTitle')}</div>
        <div className="screen-sub">{t(lang, 'walletSub')}</div>
      </div>

      {/* ── Desktop = 2-col grid, phone = flat stack ── */}
      <div className={isDesktop ? 'desktop-2col' : null}>

        {/* Left column: KPI + Add savings */}
        <div className={isDesktop ? 'desktop-col-main' : null}>

          {/* Total saved KPI */}
          <div className="card">
            <div className="kpi">
              <div>
                <div className="kpi-label">{t(lang, 'totalSavedLabel')}</div>
                <div className="kpi-value">€{totalSaved.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Add savings */}
          <div className="card">
            <h3>{t(lang, 'addTitle')}</h3>

            <div className="allocate-panel">
              <div className="alloc-display">
                <div className="alloc-display-input-wrap">
                  <span className="alloc-currency-sign">€</span>
                  <input
                    className={`alloc-display-input${showAddKeypad ? ' alloc-display-input--active' : ''}`}
                    type="number"
                    inputMode="none"
                    placeholder="0.00"
                    value={amount}
                    onFocus={() => setShowAddKeypad(true)}
                    onBlur={() => setTimeout(() => setShowAddKeypad(false), 120)}
                    readOnly
                  />
                </div>
              </div>

              {showAddKeypad && (
                <div className="alloc-keypad">
                  <div className="alloc-keypad-hdr">
                    <span className="alloc-keypad-hint">type amount</span>
                    <button
                      className="alloc-keypad-close"
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowAddKeypad(false)}
                      type="button"
                    >↓</button>
                  </div>
                  {['7','8','9','4','5','6','1','2','3','0','.','⌫'].map(key => (
                    <button
                      key={key}
                      className={`keypad-btn${key === '⌫' ? ' keypad-del' : ''}`}
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => handleAddKeypad(key)}
                      type="button"
                    >{key}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="field" style={{ marginTop: 12, marginBottom: 12 }}>
              <span>{t(lang, 'noteLbl')}</span>
              <input
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder={t(lang, 'notePh')}
              />
            </div>

            <button
              className="btn btn-primary btn-full"
              onClick={handleAdd}
              disabled={busy || amtNum <= 0}
              type="button"
            >
              {busy ? '…' : amtNum > 0 ? `${t(lang, 'add')} €${amtNum.toFixed(2)}` : t(lang, 'add')}
            </button>

            {disposable > 0 && (
              <div className="plan-box">
                <div className="plan-title">{t(lang, 'planTitle')}</div>
                <div className="plan-body">{planAmt}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Transactions + Friends */}
        <div className={isDesktop ? 'desktop-col-side' : null}>

          {/* Recent transactions */}
          <div className="card">
            <h3>{t(lang, 'txTitle')}</h3>
            {transactions.length === 0 ? (
              <div className="empty-state">{t(lang, 'txEmpty')}</div>
            ) : (
              <>
                {displayTx.map((tx, i) => (
                  <div className="tx-item" key={tx.id}>
                    <div
                      className="tx-icon"
                      style={{
                        background:  AVATAR_COLORS[i % AVATAR_COLORS.length] + '22',
                        borderColor: AVATAR_COLORS[i % AVATAR_COLORS.length] + '44',
                        color:       AVATAR_COLORS[i % AVATAR_COLORS.length],
                        fontWeight: 800, fontSize: 13,
                      }}
                    >€</div>
                    <div className="tx-body">
                      <div className="tx-note">{tx.note || t(lang, 'addTitle')}</div>
                      <div className="tx-date">{fmtDate(tx.date)}</div>
                    </div>
                    <div className="tx-amount">+€{tx.amount.toFixed(2)}</div>
                    <button
                      className="tx-del"
                      onClick={() => deleteTransaction(tx.id)}
                      aria-label="Delete"
                      type="button"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                ))}
                {transactions.length > 5 && (
                  <button className="show-all-btn" onClick={() => setShowAll(v => !v)} type="button">
                    {showAll ? t(lang, 'viewLess') : t(lang, 'viewAll')}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Saving with friends leaderboard */}
          <div className="card">
            <h3>{t(lang, 'friendsTitle')}</h3>
            <p className="muted small" style={{ marginBottom: 12, lineHeight: 1.5 }}>
              {t(lang, 'friendsDesc')}
            </p>
            <div className="leaderboard">
              {board.map((entry, i) => (
                <div key={entry.id} className={`lb-item${entry.isMe ? ' lb-you' : ''}`}>
                  <span className={`lb-rank ${rankClass(i)}`}>{i + 1}</span>
                  <div className="lb-avatar" style={{ background: COLORS[i % COLORS.length] }}>
                    {initials(entry.name)}
                  </div>
                  <div className="lb-name">{entry.name}{entry.isMe ? ' (you)' : ''}</div>
                  <div className="lb-amount">€{entry.amount.toFixed(2)}</div>
                  {!entry.isMe && (
                    <button className="tx-del" onClick={() => deleteFriend(entry.id)} aria-label="Remove" type="button">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {showForm ? (
              <div className="friend-add-form">
                <div className="field" style={{ marginBottom: 10 }}>
                  <span>{t(lang, 'friendNameLabel')}</span>
                  <input
                    value={newFriend}
                    onChange={e => setNewFriend(e.target.value)}
                    placeholder={t(lang, 'friendNamePh')}
                    onKeyDown={e => e.key === 'Enter' && handleAddFriend()}
                    autoFocus
                  />
                </div>
                <div className="row-actions">
                  <button className="btn btn-primary" onClick={handleAddFriend} disabled={friendBusy} type="button">{t(lang, 'confirmAdd')}</button>
                  <button className="btn btn-ghost" onClick={() => { setShowForm(false); setNewFriend('') }} type="button">{t(lang, 'cancelAdd')}</button>
                </div>
              </div>
            ) : (
              <div className="grid2" style={{ marginTop: 10 }}>
                <button className="btn btn-ghost" onClick={randomizeFriends} type="button">{t(lang, 'refreshFriends')}</button>
                <button className="btn btn-ghost" onClick={() => setShowForm(true)} type="button">{t(lang, 'addFriend')}</button>
              </div>
            )}
          </div>

        </div>
      </div>{/* /desktop-2col */}

      <div className="spacer" />
    </div>
  )
}
