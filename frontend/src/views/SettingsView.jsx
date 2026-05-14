import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { t, translations } from '../i18n'

const LANG_LABELS = {
  en: 'English', lt: 'Lietuvių', de: 'Deutsch',
  es: 'Español', fr: 'Français', ru: 'Русский',
}
const LANGS = Object.keys(translations).map(code => ({
  code, label: LANG_LABELS[code] ?? code,
}))

let _id = Date.now()
const uid = () => String(++_id)

export default function SettingsView() {
  const { state, dispatch, updateUser, showToast, logout, navigate } = useApp()
  const { user, lang, dark } = state

  /* ── General UI ── */
  const [showLang, setShowLang] = useState(false)

  /* ── Goals state ── */
  const [goals,            setGoals]            = useState([])
  const [showGoalModal,    setShowGoalModal]     = useState(false)
  const [editingGoal,      setEditingGoal]       = useState(null)
  const [draftGName,       setDraftGName]        = useState('')
  const [draftGTarget,     setDraftGTarget]      = useState('')
  const [showGoalConfirm,  setShowGoalConfirm]   = useState(false)

  /* ── Budget state ── */
  const [showBudgetModal,    setShowBudgetModal]    = useState(false)
  const [draftIncome,        setDraftIncome]        = useState('')
  const [draftExpenses,      setDraftExpenses]      = useState('')
  const [showBudgetConfirm,  setShowBudgetConfirm]  = useState(false)
  const [busy,               setBusy]               = useState(false)

  /* ── Load goals from localStorage (user-scoped) ── */
  useEffect(() => {
    if (!state.token) return
    const stored = localStorage.getItem(`sun_goals_${state.token}`)
    if (stored) {
      try { setGoals(JSON.parse(stored)); return } catch {}
    }
    // Migrate from legacy single-goal fields
    if (user?.goal_name || user?.goal > 0) {
      const migrated = [{
        id:     uid(),
        name:   user.goal_name || 'My Goal',
        target: parseFloat(user.goal) || 0,
      }]
      setGoals(migrated)
      localStorage.setItem(`sun_goals_${state.token}`, JSON.stringify(migrated))
    }
  }, [state.token]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Persist goals + sync primary goal to backend ── */
  function persistGoals(updated) {
    setGoals(updated)
    localStorage.setItem(`sun_goals_${state.token}`, JSON.stringify(updated))
    const primary = updated[0]
    updateUser({
      goal:      primary ? primary.target : 0,
      goal_name: primary ? primary.name   : '',
    })
  }

  /* ── Goal modal ── */
  function openAddGoal() {
    setEditingGoal(null); setDraftGName(''); setDraftGTarget('')
    setShowGoalConfirm(false); setShowGoalModal(true)
  }
  function openEditGoal(g) {
    setEditingGoal(g); setDraftGName(g.name); setDraftGTarget(String(g.target))
    setShowGoalConfirm(false); setShowGoalModal(true)
  }
  function closeGoalModal() {
    setShowGoalModal(false); setShowGoalConfirm(false)
  }
  function confirmGoal() {
    const name   = draftGName.trim() || 'Goal'
    const target = parseFloat(draftGTarget) || 0
    const updated = editingGoal
      ? goals.map(g => g.id === editingGoal.id ? { ...g, name, target } : g)
      : [...goals, { id: uid(), name, target }]
    persistGoals(updated)
    showToast(editingGoal ? 'Goal updated!' : 'Goal added!', 'success')
    closeGoalModal()
  }
  function deleteGoal(id) {
    persistGoals(goals.filter(g => g.id !== id))
    showToast('Goal removed.', 'info')
  }

  /* ── Budget modal ── */
  function openBudgetModal() {
    setDraftIncome(user?.income ?? ''); setDraftExpenses(user?.expenses ?? '')
    setShowBudgetConfirm(false); setShowBudgetModal(true)
  }
  function closeBudgetModal() {
    setShowBudgetModal(false); setShowBudgetConfirm(false)
  }
  async function confirmBudget() {
    setBusy(true)
    try {
      await updateUser({
        income:   parseFloat(draftIncome)   || 0,
        expenses: parseFloat(draftExpenses) || 0,
      })
      showToast('Budget updated!', 'success')
      closeBudgetModal()
    } finally { setBusy(false) }
  }

  /* ── Dark / lang ── */
  async function handleDarkToggle(e) {
    const d = e.target.checked
    dispatch({ type: 'SET_DARK', dark: d })
    await updateUser({ dark_mode: d })
  }
  async function handleLangSelect(code) {
    dispatch({ type: 'SET_LANG', lang: code })
    setShowLang(false)
    await updateUser({ lang: code })
    document.documentElement.lang = code
  }

  const currentLangLabel = LANGS.find(l => l.code === lang)?.label || 'English'
  const fmtE = v => (v && parseFloat(v) > 0) ? `€${parseFloat(v).toLocaleString()}` : '—'

  // Read archived goals so empty-state message can distinguish "all done" vs "none yet"
  const archivedCount = (() => {
    try { return JSON.parse(localStorage.getItem(`sun_goals_archived_${state.token}`) || '[]').length }
    catch { return 0 }
  })()

  return (
    <div className="view view-enter">
      <div className="screen-hdr screen-hdr-grad">
        <div className="screen-title">{t(lang, 'settingsTitle')}</div>
        <div className="screen-sub">{goals[0]?.name || ''}</div>
      </div>

      {/* ── General ── */}
      <div className="card">
        <div className="settings-list">
          <button className="setting-item" onClick={() => navigate('account')} type="button">
            <span>{t(lang, 'accountRow')}</span>
            <span className="chev">›</span>
          </button>

          <div className="setting-item">
            <span>{t(lang, 'langLabel')}</span>
            <button className="pill-btn" onClick={() => setShowLang(v => !v)} type="button">
              {currentLangLabel} <span>▾</span>
            </button>
          </div>
          {showLang && (
            <div className="picker-panel">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  className={`picker-opt${lang === code ? ' selected' : ''}`}
                  onClick={() => handleLangSelect(code)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <button className="setting-item" onClick={() => navigate('privacy')} type="button">
            <span>{t(lang, 'privacyRow')}</span>
            <span className="chev">›</span>
          </button>

          <div className="setting-item">
            <div>
              <div className="label-strong">{t(lang, 'darkModeLabel')}</div>
              <div className="label-sub">{t(lang, 'darkModeSub')}</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={dark} onChange={handleDarkToggle} />
              <span className="slider" />
            </label>
          </div>
        </div>
      </div>

      {/* ── Goals & plan ── */}
      <div className="card">
        <h3>{t(lang, 'goalPlanTitle')}</h3>

        {/* Monthly budget */}
        <div className="card-section-label">{t(lang, 'monthlyBudget') || 'Monthly budget'}</div>
        <div className="plan-summary">
          <div className="plan-summary-item">
            <span className="plan-summary-label">{t(lang, 'incomeEdit')}</span>
            <span className="plan-summary-val">{fmtE(user?.income)}</span>
          </div>
          <div className="plan-summary-item">
            <span className="plan-summary-label">{t(lang, 'expensesEdit')}</span>
            <span className="plan-summary-val">{fmtE(user?.expenses)}</span>
          </div>
        </div>
        <button
          className="btn btn-ghost btn-full btn-sm"
          onClick={openBudgetModal}
          type="button"
          style={{ marginTop: 10 }}
        >
          {t(lang, 'changeBudget') || 'Change budget'}
        </button>

        <div className="card-divider" />

        {/* Saving goals */}
        <div className="card-section-label">{t(lang, 'savingGoals') || 'Saving goals'}</div>

        {goals.length === 0 ? (
          <div className="goals-empty-state">
            <div className="goals-empty-msg">
              {archivedCount > 0
                ? (t(lang, 'allGoalsDone') || 'All goals completed. Set a new one!')
                : (t(lang, 'noGoals')      || 'No goals yet.')}
            </div>
            <button
              className="btn btn-primary btn-full"
              onClick={openAddGoal}
              type="button"
              style={{ marginTop: 12 }}
            >
              + {t(lang, 'addGoal') || 'Add goal'}
            </button>
          </div>
        ) : (
          <>
            <div className="goals-list">
              {goals.map((g) => (
                <div key={g.id} className="goal-item">
                  <div className="goal-item-left">
                    <span className="goal-item-name">{g.name}</span>
                  </div>
                  <div className="goal-item-right">
                    <span className="goal-item-target">{fmtE(g.target)}</span>
                    <button className="goal-btn" onClick={() => openEditGoal(g)} type="button">
                      {t(lang, 'editBtn') || 'Edit'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-ghost btn-full btn-sm"
              onClick={openAddGoal}
              type="button"
              style={{ marginTop: 10 }}
            >
              + {t(lang, 'addGoal') || 'Add goal'}
            </button>
          </>
        )}
      </div>

      <div className="spacer" />

      {/* ════════════════════════════════════════
          Goal add / edit modal (bottom sheet)
      ════════════════════════════════════════ */}
      {showGoalModal && (
        <div className="plan-overlay" onClick={e => { if (e.target === e.currentTarget) closeGoalModal() }}>
          <div className="plan-modal">
            <div className="plan-modal-hdr">
              <span className="plan-modal-title">
                {editingGoal
                  ? (t(lang, 'editGoal')  || 'Edit goal')
                  : (t(lang, 'addGoal')   || 'Add goal')}
              </span>
              <button className="plan-modal-close" onClick={closeGoalModal} type="button">×</button>
            </div>

            <div className="grid2" style={{ marginBottom: 18 }}>
              <div className="field">
                <span>{t(lang, 'goalNameEdit')}</span>
                <input value={draftGName} onChange={e => setDraftGName(e.target.value)} placeholder="e.g. Trip to Italy" />
              </div>
              <div className="field">
                <span>{t(lang, 'goalEdit')}</span>
                <input value={draftGTarget} onChange={e => setDraftGTarget(e.target.value)} inputMode="decimal" placeholder="0.00" />
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={() => setShowGoalConfirm(true)} type="button">
              {t(lang, 'save')} →
            </button>

            {editingGoal && (
              <button
                className="btn btn-danger btn-full"
                onClick={() => { deleteGoal(editingGoal.id); closeGoalModal() }}
                type="button"
                style={{ marginTop: 8 }}
              >
                {t(lang, 'deleteGoal') || 'Delete goal'}
              </button>
            )}
          </div>

          {showGoalConfirm && (
            <div className="confirm-overlay">
              <div className="confirm-bubble">
                <div className="confirm-title">{t(lang, 'confirmTitle') || 'Save changes?'}</div>
                <div className="confirm-sub">
                  {editingGoal
                    ? (t(lang, 'confirmGoalEdit') || 'This goal will be updated.')
                    : (t(lang, 'confirmGoalAdd')  || 'A new goal will be added to your list.')}
                </div>
                <div className="confirm-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowGoalConfirm(false)} type="button">
                    {t(lang, 'cancel') || 'Cancel'}
                  </button>
                  <button className="btn btn-primary btn-sm confirm-btn-confirm" onClick={confirmGoal} type="button">
                    {t(lang, 'confirm') || 'Confirm'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════
          Budget edit modal (bottom sheet)
      ════════════════════════════════════════ */}
      {showBudgetModal && (
        <div className="plan-overlay" onClick={e => { if (e.target === e.currentTarget) closeBudgetModal() }}>
          <div className="plan-modal">
            <div className="plan-modal-hdr">
              <span className="plan-modal-title">{t(lang, 'monthlyBudget') || 'Monthly budget'}</span>
              <button className="plan-modal-close" onClick={closeBudgetModal} type="button">×</button>
            </div>

            <div className="grid2" style={{ marginBottom: 18 }}>
              <div className="field">
                <span>{t(lang, 'incomeEdit')}</span>
                <input value={draftIncome} onChange={e => setDraftIncome(e.target.value)} inputMode="decimal" placeholder="0.00" />
              </div>
              <div className="field">
                <span>{t(lang, 'expensesEdit')}</span>
                <input value={draftExpenses} onChange={e => setDraftExpenses(e.target.value)} inputMode="decimal" placeholder="0.00" />
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={() => setShowBudgetConfirm(true)} type="button">
              {t(lang, 'save')} →
            </button>
          </div>

          {showBudgetConfirm && (
            <div className="confirm-overlay">
              <div className="confirm-bubble">
                <div className="confirm-title">{t(lang, 'confirmTitle') || 'Save changes?'}</div>
                <div className="confirm-sub">{t(lang, 'confirmSub') || 'Your monthly budget will be updated.'}</div>
                <div className="confirm-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowBudgetConfirm(false)} type="button" disabled={busy}>
                    {t(lang, 'cancel') || 'Cancel'}
                  </button>
                  <button className="btn btn-primary btn-sm confirm-btn-confirm" onClick={confirmBudget} type="button" disabled={busy}>
                    {busy ? '...' : (t(lang, 'confirm') || 'Confirm')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
