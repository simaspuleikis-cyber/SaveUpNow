import { useApp } from '../context/AppContext'
import { t } from '../i18n'

const CHECK_ICO = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)
const LOCK_ICO = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)
const SHIELD_ICO = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const ARROW_ICO = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function LandingScreen() {
  const { state, setAppStage } = useApp()
  const { lang } = state

  const headline     = t(lang, 'leftTitle')
  const accentPhrase = t(lang, 'accentWords')
  const splitIdx     = headline.toLowerCase().indexOf(accentPhrase.toLowerCase())
  const steps        = t(lang, 'howSteps')

  const features = [
    { icon: CHECK_ICO,  title: t(lang, 'f1t'), desc: t(lang, 'f1d') },
    { icon: LOCK_ICO,   title: t(lang, 'f2t'), desc: t(lang, 'f2d') },
    { icon: SHIELD_ICO, title: t(lang, 'f3t'), desc: t(lang, 'f3d') },
  ]

  return (
    <div className="ls-root">

      {/* ── Top bar ── */}
      <header className="ls-header">
        <div className="brand">
          <div className="logo">S</div>
          <div>
            <div className="brand-name">SaveUpNow</div>
            <div className="brand-sub">{t(lang, 'brandSub')}</div>
          </div>
        </div>
        <div className="ls-header-badge">{t(lang, 'heroBadge')}</div>
      </header>

      {/* ── Scrollable body ── */}
      <div className="ls-body">

        {/* Hero section */}
        <section className="ls-hero">
          <div className="ls-hero-inner">
            <div className="hero-badge">
              <span className="hero-dot" />
              <span>{t(lang, 'heroBadge')}</span>
            </div>

            <h1 className="ls-h1">
              {splitIdx >= 0 ? (
                <>
                  {headline.slice(0, splitIdx)}
                  <span className="ls-h1-accent">{accentPhrase}</span>
                  {headline.slice(splitIdx + accentPhrase.length)}
                </>
              ) : headline}
            </h1>

            <p className="ls-lead">{t(lang, 'leftIntro')}</p>

            {/* Stats */}
            <div className="ls-stats">
              {[
                { val: '100%', lbl: t(lang, 'stat1') },
                { val: '0',    lbl: t(lang, 'stat2') },
                { val: '∞',    lbl: t(lang, 'stat3') },
              ].map(({ val, lbl }) => (
                <div className="ls-stat" key={lbl}>
                  <div className="ls-stat-val">{val}</div>
                  <div className="ls-stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="ls-section">
          <div className="ls-section-inner">
            <div className="ls-features">
              {features.map(({ icon, title, desc }) => (
                <div className="ls-feature" key={title}>
                  <div className="ls-feature-icon">{icon}</div>
                  <div>
                    <div className="ls-feature-title">{title}</div>
                    <div className="ls-feature-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ls-divider" />

            {/* How it works */}
            <div className="ls-how-title">{t(lang, 'howTitle')}</div>
            <ol className="ls-steps">
              {Array.isArray(steps) && steps.map((s, i) => (
                <li key={i}>
                  <span className="ls-step-num">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>

            <div className="ls-tip">
              <span className="ls-tip-dot">💡</span>
              {t(lang, 'tipText')}
            </div>
          </div>
        </section>

      </div>

      {/* ── Sticky Continue bar ── */}
      <div className="ls-continue-bar">
        <div className="ls-continue-inner">
          <div className="ls-continue-left">
            <div className="ls-continue-brand">SaveUpNow</div>
            <div className="ls-continue-sub">Free · Private · No servers</div>
          </div>
          <button
            className="ls-continue-btn"
            onClick={() => setAppStage('mode-select')}
            type="button"
          >
            <span>Continue</span>
            {ARROW_ICO}
          </button>
        </div>
      </div>

    </div>
  )
}
