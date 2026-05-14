import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

function loadGoals(token) {
  if (!token) return []
  const raw = localStorage.getItem(`sun_goals_${token}`)
  if (!raw) return []
  try {
    return JSON.parse(raw).map(g => ({ allocated: 0, ...g }))
  } catch { return [] }
}

export default function HomeView() {
  const { state, updateUser, navigate } = useApp()
  const { user, stats, lang, viewMode } = state
  const isDesktop = viewMode === 'desktop'

  const [congratsGoal, setCongratsGoal] = useState(null)
  const [homeGoals,    setHomeGoals]    = useState(() => loadGoals(state.token))
  const [allocGoalId,  setAllocGoalId]  = useState(null)   // which goal is selected
  const [allocAmount,  setAllocAmount]  = useState('')
  const [showKeypad,   setShowKeypad]   = useState(false)

  // Re-sync goals from localStorage on token change or window focus
  useEffect(() => {
    const loaded = loadGoals(state.token)
    setHomeGoals(loaded)
    setAllocGoalId(id => {
      if (loaded.find(g => g.id === id)) return id
      return loaded[0]?.id ?? null
    })
  }, [state.token])

  useEffect(() => {
    function sync() {
      const loaded = loadGoals(state.token)
      setHomeGoals(loaded)
      setAllocGoalId(id => {
        if (loaded.find(g => g.id === id)) return id
        return loaded[0]?.id ?? null
      })
    }
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [state.token])

  const totalSaved     = stats?.total_saved      || 0
  const thisMonth      = stats?.saved_this_month || 0
  const streak         = stats?.streak           || 0
  const txCount        = stats?.tx_count         || 0

  const hasGoals       = homeGoals.length > 0
  const primaryGoal    = hasGoals ? homeGoals[0] : null
  const totalAllocated = homeGoals.reduce((s, g) => s + (g.allocated || 0), 0)
  const available      = Math.max(0, totalSaved - totalAllocated)

  // Resolve which goal is currently selected for allocation
  const selectedGoal = homeGoals.find(g => g.id === allocGoalId) ?? homeGoals[0] ?? null

  // How much the selected goal still needs, and the true max we can allocate
  const goalRemaining = selectedGoal
    ? Math.max(0, (selectedGoal.target || 0) - (selectedGoal.allocated || 0))
    : 0
  const goalMax = Math.min(available, goalRemaining)

  // Allocation amount derived values (component-level, not per-card)
  const allocEuros = parseFloat(allocAmount) || 0
  const allocPct   = goalMax > 0 ? Math.round(allocEuros / goalMax * 100) : 0

  // Persist goals array to localStorage
  function saveGoals(updated) {
    if (!state.token) return
    localStorage.setItem(`sun_goals_${state.token}`, JSON.stringify(updated))
    setHomeGoals(updated)
  }

  // Keypad press handler
  function handleKeypadPress(key) {
    setAllocAmount(prev => {
      if (key === '⌫') return prev.slice(0, -1)
      if (key === '.' && prev.includes('.')) return prev
      const dot = prev.indexOf('.')
      if (dot >= 0 && prev.length - dot >= 3) return prev
      const next = prev + key
      if (next.length > 1 && next[0] === '0' && next[1] !== '.') return next.slice(1)
      const num = parseFloat(next)
      if (!isNaN(num) && num > goalMax) return goalMax.toFixed(2)
      return next
    })
  }

  // Allocate amount to the selected goal
  function doAllocate() {
    const goalId = selectedGoal?.id
    if (!goalId) return
    const amt = parseFloat(allocAmount)
    if (!amt || amt <= 0 || amt > goalMax) return

    const updated = homeGoals.map(g =>
      g.id === goalId ? { ...g, allocated: (g.allocated || 0) + amt } : g
    )
    saveGoals(updated)
    setAllocAmount('')
    setShowKeypad(false)

    // Check for goal completion
    const updatedGoal = updated.find(g => g.id === goalId)
    if (updatedGoal && updatedGoal.target > 0 && updatedGoal.allocated >= updatedGoal.target) {
      const seenKey = `sun_congrats_${state.token}`
      const seen    = new Set(JSON.parse(localStorage.getItem(seenKey) || '[]'))
      if (!seen.has(goalId)) {
        seen.add(goalId)
        localStorage.setItem(seenKey, JSON.stringify([...seen]))
        setCongratsGoal(updatedGoal)
      }
    }
  }

  // Archive a completed goal
  function archiveAndDismiss() {
    if (!congratsGoal || !state.token) { setCongratsGoal(null); return }
    const goalsKey   = `sun_goals_${state.token}`
    const archiveKey = `sun_goals_archived_${state.token}`

    const active    = JSON.parse(localStorage.getItem(goalsKey) || '[]')
    const remaining = active.filter(g => g.id !== congratsGoal.id)
    localStorage.setItem(goalsKey, JSON.stringify(remaining))
    setHomeGoals(remaining)
    setAllocGoalId(remaining[0]?.id ?? null)

    const archived = JSON.parse(localStorage.getItem(archiveKey) || '[]')
    archived.unshift({ ...congratsGoal, completedAt: new Date().toISOString() })
    localStorage.setItem(archiveKey, JSON.stringify(archived))

    const next = remaining[0]
    updateUser({ goal: next ? next.target : 0, goal_name: next ? next.name : '' })
    setCongratsGoal(null)
  }

  return (
    <div className="view view-enter">
      <div className="screen-hdr screen-hdr-grad">
        <div className="screen-title">{t(lang, 'homeTitle')}</div>
        <div className="screen-sub">
          {hasGoals ? (primaryGoal.name || t(lang, 'homeSubtitle')) : t(lang, 'homeSubtitle')}
        </div>
      </div>

      {/* ── Streak row ── */}
      <div className="streak-row">
        <div className="streak-item">
          <div className={`streak-val ${streak > 0 ? 'streak-fire' : ''}`}>{streak}</div>
          <div className="streak-lbl">{t(lang, 'streakLbl')}</div>
        </div>
        <div className="streak-div" />
        <div className="streak-item">
          <div className="streak-val">{hasGoals ? `€${(primaryGoal?.target || 0).toFixed(0)}` : '—'}</div>
          <div className="streak-lbl">{t(lang, 'goalMini')}</div>
        </div>
      </div>

      {/* ── Main content: desktop = 2-col grid, phone = flat stack ── */}
      <div className={isDesktop ? 'desktop-2col' : null}>

        {/* Left column (or full-width on phone): savings + allocate/no-goals */}
        <div className={isDesktop ? 'desktop-col-main' : null}>

          {/* Savings bubble */}
          <div className="card savings-card">
            <div className="savings-card-title">{t(lang, 'savingsTitle') || 'Your savings'}</div>
            <div className="savings-total">€{totalSaved.toFixed(2)}</div>
            <div className="savings-sub-lbl">{t(lang, 'savedMonthLabel')}: <strong>€{thisMonth.toFixed(2)}</strong></div>
            {hasGoals && (
              <div className="savings-pool">
                <div className="savings-pool-row">
                  <span className="savings-pool-lbl">{t(lang, 'allocatedToGoals') || 'In goals'}</span>
                  <span className="savings-pool-val savings-pool-allocated">€{totalAllocated.toFixed(2)}</span>
                </div>
                <div className="savings-pool-divider" />
                <div className="savings-pool-row">
                  <span className="savings-pool-lbl">{t(lang, 'availablePool') || 'Available to allocate'}</span>
                  <span className="savings-pool-val savings-pool-available">€{available.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* No goals state */}
          {!hasGoals && (
            <div className="card no-goals-card">
              <div className="no-goals-title">{t(lang, 'noActiveGoals') || 'No saving goals'}</div>
              <div className="no-goals-sub">{t(lang, 'noActiveGoalsSub') || 'Set a goal to start tracking your progress.'}</div>
              <button
                className="btn btn-primary btn-full"
                onClick={() => navigate('settings')}
                type="button"
                style={{ marginTop: 14 }}
              >
                {t(lang, 'setGoalBtn') || 'Set a goal'}
              </button>
            </div>
          )}

          {/* Allocate card */}
          {hasGoals && (
            <div className="card">
              {homeGoals.length > 1 && (
                <div className="alloc-goal-picker">
                  {homeGoals.map(g => (
                    <button
                      key={g.id}
                      className={`alloc-goal-chip${(allocGoalId ?? homeGoals[0]?.id) === g.id ? ' alloc-goal-chip--active' : ''}`}
                      onClick={() => { setAllocGoalId(g.id); setAllocAmount(''); setShowKeypad(false) }}
                      type="button"
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="alloc-to-row">
                <span className="alloc-to-label">{t(lang, 'allocateBtn') || 'Allocate to'}:</span>
                <strong className="alloc-to-name">{selectedGoal?.name}</strong>
              </div>

              {available <= 0 ? (
                <div className="alloc-no-funds">
                  <span>{t(lang, 'noFundsToAllocate') || 'No funds to allocate'}</span>
                  <small>Add savings in the Wallet tab</small>
                </div>
              ) : goalRemaining <= 0 ? (
                <div className="alloc-no-funds">
                  <span>🎯 {t(lang, 'goalAlreadyFull') || 'Goal already reached!'}</span>
                  <small>{t(lang, 'goalAlreadyFullSub') || 'This goal is fully funded.'}</small>
                </div>
              ) : (
                <>
                  <div className="allocate-panel">
                    <div className="alloc-info-rows">
                      <div className="alloc-info-row">
                        <span className="alloc-info-lbl">{t(lang, 'availablePool') || 'Available in pool'}</span>
                        <strong className="alloc-info-val">€{available.toFixed(2)}</strong>
                      </div>
                      <div className="alloc-info-row">
                        <span className="alloc-info-lbl">{t(lang, 'goalNeeds') || 'Goal still needs'}</span>
                        <strong className="alloc-info-val alloc-info-val--goal">€{goalRemaining.toFixed(2)}</strong>
                      </div>
                    </div>

                    <div className="alloc-display">
                      <div className="alloc-display-input-wrap">
                        <span className="alloc-currency-sign">€</span>
                        <input
                          className={`alloc-display-input${showKeypad ? ' alloc-display-input--active' : ''}`}
                          type="number"
                          inputMode="none"
                          placeholder="0.00"
                          value={allocAmount}
                          onFocus={() => setShowKeypad(true)}
                          onBlur={() => setTimeout(() => setShowKeypad(false), 120)}
                          readOnly
                        />
                      </div>
                      <span className="alloc-display-pct">{allocPct}%</span>
                    </div>

                    <div className="alloc-slider-wrap">
                      <input
                        type="range"
                        className="alloc-slider"
                        min="0" max="100" step="1"
                        value={allocPct}
                        onChange={e =>
                          setAllocAmount((parseInt(e.target.value, 10) * goalMax / 100).toFixed(2))
                        }
                        style={{ '--pct': `${allocPct}%` }}
                      />
                      <div className="alloc-slider-labels">
                        <span>€0</span>
                        <span>€{(goalMax / 2).toFixed(0)}</span>
                        <span>€{goalMax.toFixed(0)}</span>
                      </div>
                    </div>

                    {showKeypad && (
                      <div className="alloc-keypad">
                        <div className="alloc-keypad-hdr">
                          <span className="alloc-keypad-hint">tap amount to edit</span>
                          <button
                            className="alloc-keypad-close"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowKeypad(false)}
                            type="button"
                          >↓</button>
                        </div>
                        {['7','8','9','4','5','6','1','2','3','0','.','⌫'].map(key => (
                          <button
                            key={key}
                            className={`keypad-btn${key === '⌫' ? ' keypad-del' : ''}`}
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => handleKeypadPress(key)}
                            type="button"
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className="btn btn-primary btn-full"
                    onClick={doAllocate}
                    disabled={allocEuros <= 0}
                    type="button"
                    style={{ marginTop: 10 }}
                  >
                    {allocEuros > 0
                      ? `${t(lang, 'allocateConfirm') || 'Allocate'} €${allocEuros.toFixed(2)}`
                      : (t(lang, 'allocateConfirm') || 'Allocate')}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right column (desktop) or inline (phone): goal progress cards */}
        {hasGoals && (
          <div className={isDesktop ? 'desktop-col-side' : null}>
            {homeGoals.map(g => {
              const goalPct   = g.target > 0 ? Math.min((g.allocated || 0) / g.target * 100, 100) : 0
              const remaining = Math.max(0, (g.target || 0) - (g.allocated || 0))
              return (
                <div className="card goal-progress-card" key={g.id}>
                  <div className="goal-progress-hdr">
                    <span className="goal-progress-name">{g.name}</span>
                    <span className="goal-progress-target">€{(g.target || 0).toLocaleString()}</span>
                  </div>
                  <div className="goal-progress-track">
                    <div className="goal-progress-bar">
                      <div className="goal-progress-fill" style={{ width: `${goalPct}%` }} />
                    </div>
                    <span className="goal-progress-pct">{Math.round(goalPct)}%</span>
                  </div>
                  <div className="goal-progress-amounts">
                    <span>€{(g.allocated || 0).toFixed(2)} {t(lang, 'ofLabel') || 'of'} €{(g.target || 0).toLocaleString()}</span>
                    {remaining > 0 && (
                      <span className="goal-progress-remaining"> · €{remaining.toFixed(2)} {t(lang, 'remainingMini')}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>{/* /desktop-2col */}

      <div className="spacer" />

      {/* ── Goal completed congrats bubble ── */}
      {congratsGoal && (
        <div className="modal-overlay" onClick={archiveAndDismiss}>
          <div className="confirm-bubble confirm-success" onClick={e => e.stopPropagation()}>
            <div className="confirm-success-icon">&#10003;</div>
            <div className="confirm-title">{t(lang, 'goalDoneTitle') || 'Goal reached!'}</div>
            <div className="confirm-sub">
              <strong>{congratsGoal.name}</strong>
              {' — '}
              {t(lang, 'goalDoneSub') || 'You hit your target of'}{' '}
              <strong>€{(congratsGoal.target || 0).toLocaleString()}</strong>.
              {' '}{t(lang, 'goalDoneEnd') || 'Outstanding work!'}
            </div>
            <div className="confirm-actions" style={{ justifyContent: 'center' }}>
              <button
                className="btn btn-success btn-sm confirm-btn-confirm"
                onClick={archiveAndDismiss}
                type="button"
              >
                {t(lang, 'goalDoneBtn') || 'Keep saving'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
