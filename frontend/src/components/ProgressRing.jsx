const R   = 38
const CIRC = 2 * Math.PI * R  // ≈ 238.8

export default function ProgressRing({ pct = 0, label = '0%', sub = 'of goal' }) {
  const clamped = Math.min(Math.max(pct, 0), 100)
  const offset  = CIRC - (clamped / 100) * CIRC
  const done    = clamped >= 100

  return (
    <div className="ring-wrap" aria-label={`${label} ${sub}`}>
      <svg viewBox="0 0 88 88">
        <defs>
          <linearGradient id="ringGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="88" y2="88">
            <stop offset="0%"   stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="ringGradDone" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="88" y2="88">
            <stop offset="0%"   stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <circle className="ring-bg" cx="44" cy="44" r={R} />
        <circle
          className={`ring-fg${done ? ' done' : ''}`}
          cx="44" cy="44" r={R}
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="ring-inner">
        <div className="ring-pct">{label}</div>
        <div className="ring-lbl">{sub}</div>
      </div>
    </div>
  )
}
