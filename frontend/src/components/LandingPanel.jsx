import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'

const CHECK_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
)
const LOCK_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)
const SHIELD_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export default function LandingPanel() {
  const { state } = useApp()
  const lang = state.lang
  const panelRef = useRef(null)

  // Scroll-fade-in animation
  useEffect(() => {
    const els = panelRef.current?.querySelectorAll('[data-a]')
    if (!els?.length) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 0)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 75}ms`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const headline = t(lang, 'leftTitle')       // e.g. "Build your savings habit"
  const accentPhrase = t(lang, 'accentWords') // e.g. "savings habit"
  const splitIdx = headline.toLowerCase().indexOf(accentPhrase.toLowerCase())

  const steps = t(lang, 'howSteps')

  return (
    <section className="panel-left" ref={panelRef}>
      {/* Badge */}
      <div className="hero-badge" data-a>
        <span className="hero-dot" />
        <span>{t(lang, 'heroBadge')}</span>
      </div>

      {/* Headline */}
      <h1 className="hero-h1" data-a>
        {splitIdx >= 0 ? (
          <>
            {headline.slice(0, splitIdx)}
            <span className="grad-text">{accentPhrase}</span>
            {headline.slice(splitIdx + accentPhrase.length)}
          </>
        ) : headline}
      </h1>

      <p className="hero-lead" data-a>{t(lang, 'leftIntro')}</p>

      {/* Stats row */}
      <div className="hero-stats" data-a>
        {[
          { val: '100%', lbl: t(lang, 'stat1') },
          { val: '0',    lbl: t(lang, 'stat2') },
          { val: '∞',    lbl: t(lang, 'stat3') },
        ].map(({ val, lbl }) => (
          <div className="hero-stat" key={lbl}>
            <div className="stat-val">{val}</div>
            <div className="stat-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="features" data-a>
        {[
          { icon: CHECK_ICON,  title: t(lang, 'f1t'), desc: t(lang, 'f1d') },
          { icon: LOCK_ICON,   title: t(lang, 'f2t'), desc: t(lang, 'f2d') },
          { icon: SHIELD_ICON, title: t(lang, 'f3t'), desc: t(lang, 'f3d') },
        ].map(({ icon, title, desc }) => (
          <div className="feature-item" key={title}>
            <div className="feature-icon" aria-hidden="true">{icon}</div>
            <div>
              <div className="feature-title">{title}</div>
              <div className="feature-text">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* How it works */}
      <div className="eyebrow" data-a>{t(lang, 'howTitle')}</div>
      <ol className="steps" data-a>
        {Array.isArray(steps) && steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>

      <div className="info-box" data-a>
        {t(lang, 'tipText')}
      </div>

      <footer className="footnote">
        <span>© SaveUpNow</span>
        <span className="dot">•</span>
        <span>{t(lang, 'footNote')}</span>
      </footer>
    </section>
  )
}
