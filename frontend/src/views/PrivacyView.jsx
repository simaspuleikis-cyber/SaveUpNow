import { useApp } from '../context/AppContext'
import { privacyMeta, privacyIntro, privacySections, privacyFooter } from './privacyContent'

export default function PrivacyView() {
  const { state, navigate } = useApp()
  const { lang } = state

  const meta     = privacyMeta[lang]     ?? privacyMeta.en
  const intro    = privacyIntro[lang]    ?? privacyIntro.en
  const sections = privacySections[lang] ?? privacySections.en
  const footer   = privacyFooter[lang]   ?? privacyFooter.en

  return (
    <div className="view view-enter">
      {/* Header with back button */}
      <div className="screen-hdr screen-hdr-grad" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          className="privacy-back"
          onClick={() => navigate('settings')}
          aria-label="Back"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <div className="screen-title">{meta.title}</div>
          <div className="screen-sub">{meta.sub}</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 10 }}>
        <div
          className="privacy-intro"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      </div>

      {sections.map((sec) => (
        <div className="card" key={sec.num}>
          <div className="privacy-section-title">
            <span className="privacy-num">{sec.num}</span>
            {sec.title}
          </div>

          {sec.body && (
            <p className="privacy-body">
              {sec.body.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
          )}

          {sec.subsections && sec.subsections.map((sub) => (
            <div key={sub.title} style={{ marginTop: 10 }}>
              <div className="privacy-sub-title">{sub.title}</div>
              <ul className="privacy-list">
                {sub.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}

          {sec.items && !sec.subsections && (
            <ul className="privacy-list">
              {sec.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}

          {sec.footer && (
            <p className="privacy-body" style={{ marginTop: 10 }}>
              {sec.footer}
            </p>
          )}
        </div>
      ))}

      {/* Footer */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="privacy-footer-block">
          <div className="privacy-footer-line">{footer.line1}</div>
          <div className="privacy-footer-line">{footer.line2}</div>
          <div className="privacy-footer-line" style={{ marginTop: 4, color: 'var(--muted2)' }}>{footer.line3}</div>
        </div>
      </div>

      <div className="spacer" />
    </div>
  )
}
