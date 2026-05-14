import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import * as api from '../api'

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default function AuthView() {
  const { state, login, navigate, updateUser, showToast } = useApp()
  const lang = state.lang

  const [code, setCode]           = useState('')
  const [verifiedFile, setVerifiedFile] = useState(null)
  const [income, setIncome]       = useState('')
  const [expenses, setExpenses]   = useState('')
  const [goal, setGoal]           = useState('')
  const [goalName, setGoalName]   = useState('')
  const [step, setStep]           = useState('login') // login | setup
  const [busy, setBusy]           = useState(false)

  const isLoggedIn = !!state.token && !!state.user

  async function handleContinue() {
    if (!code.trim()) return
    setBusy(true)
    await login(code.trim())
    setBusy(false)
    setStep('setup')
  }

  function handleGenerate() {
    const c = generateCode()
    setCode(c)
    showToast(`Code: ${c} — save it!`, 'info')
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) setVerifiedFile(file)
  }

  async function handleSetup() {
    const inc  = parseFloat(income)  || 0
    const exp  = parseFloat(expenses) || 0
    const g    = parseFloat(goal)    || 0
    if (!g) { showToast('Please enter a goal amount', 'error'); return }
    setBusy(true)
    try {
      await updateUser({
        income: inc, expenses: exp,
        goal: g, goal_name: goalName || 'My goal',
        verified: !!verifiedFile,
      })
      navigate('home')
    } catch (e) {
      showToast(e.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  if (isLoggedIn && step === 'login') setStep('setup')

  return (
    <div className="view view-enter">
      <div className="screen-hdr screen-hdr-auth">
        <div className="screen-title">{t(lang, 'authTitle')}</div>
        <div className="screen-sub">{t(lang, 'authSub')}</div>
      </div>

      {/* Step 1: code */}
      <div className="card">
        <h3>{t(lang, 'codeTitle')}</h3>
        <p className="muted small" style={{ marginBottom: 12, lineHeight: 1.5 }}>
          {t(lang, 'codeDesc')}
        </p>

        <div className="field" style={{ marginBottom: 12 }}>
          <span>{t(lang, 'codeLabel')}</span>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            inputMode="numeric"
            placeholder={t(lang, 'codePh')}
            maxLength={12}
            onKeyDown={e => e.key === 'Enter' && handleContinue()}
          />
        </div>

        <div className="row-actions">
          <button className="btn btn-primary" onClick={handleContinue} disabled={busy || !code.trim()} type="button">
            {busy ? '…' : t(lang, 'start')}
          </button>
          <button className="btn btn-ghost" onClick={handleGenerate} type="button">
            {t(lang, 'genCode')}
          </button>
        </div>

        <div className="hint mt-sm">{t(lang, 'codeHintAuth')}</div>
      </div>

      {/* Step 2: verification (visible after login) */}
      {isLoggedIn && (
        <div className="card">
          <h3>{t(lang, 'verifyTitle')}</h3>
          <p className="muted small" style={{ marginBottom: 12, lineHeight: 1.5 }}>
            {t(lang, 'verifyDesc')}
          </p>

          <label className="upload">
            <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
            <div className="upload-ui">
              <div className="upload-icon">📄</div>
              <div className="upload-title">{t(lang, 'uploadTitle')}</div>
              <div className="upload-sub">
                {verifiedFile ? verifiedFile.name : t(lang, 'uploadSub')}
              </div>
            </div>
          </label>

          <div style={{ marginTop: 10 }}>
            <span className={`badge ${verifiedFile ? 'badge-green' : 'badge-default'}`}>
              {verifiedFile ? t(lang, 'verified') : t(lang, 'notVerified')}
            </span>
          </div>
        </div>
      )}

      {/* Step 3: goal setup */}
      {isLoggedIn && (
        <div className="card">
          <h3>{t(lang, 'setupTitle')}</h3>

          <div className="grid2" style={{ marginBottom: 10 }}>
            <div className="field">
              <span>{t(lang, 'incomeLabel')}</span>
              <input value={income} onChange={e => setIncome(e.target.value)} inputMode="decimal" placeholder="0.00" />
            </div>
            <div className="field">
              <span>{t(lang, 'expensesLabel')}</span>
              <input value={expenses} onChange={e => setExpenses(e.target.value)} inputMode="decimal" placeholder="0.00" />
            </div>
          </div>

          <div className="grid2" style={{ marginBottom: 14 }}>
            <div className="field">
              <span>{t(lang, 'goalLabel')}</span>
              <input value={goal} onChange={e => setGoal(e.target.value)} inputMode="decimal" placeholder="0.00" />
            </div>
            <div className="field">
              <span>{t(lang, 'goalNameLabel')}</span>
              <input value={goalName} onChange={e => setGoalName(e.target.value)} placeholder={t(lang, 'goalNamePh')} />
            </div>
          </div>

          <button className="btn btn-primary btn-full" onClick={handleSetup} disabled={busy} type="button">
            {busy ? '…' : t(lang, 'saveContinue')}
          </button>
        </div>
      )}

      <div className="spacer" />
    </div>
  )
}
