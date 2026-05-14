const W = 260
const H = 72
const BAR_W = 28
const PAD   = 4

export default function BarChart({ months = [] }) {
  if (!months.length) return null

  const last6  = months.slice(-6)
  const maxAmt = Math.max(...last6.map(m => m.amount), 1)
  const count  = last6.length
  const step   = count > 1 ? (W - BAR_W) / (count - 1) : 0

  const currentKey = new Date().toISOString().slice(0, 7)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="chart-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#818cf8" stopOpacity="1" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="barGradCur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#34d399" stopOpacity="1" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {last6.map((m, i) => {
        const barH   = Math.max(4, (m.amount / maxAmt) * (H - 20))
        const x      = i * step
        const y      = H - barH - 14
        const isCur  = m.key === currentKey
        const label  = m.key.slice(5)   // "MM"

        return (
          <g key={m.key}>
            <rect
              x={x} y={y}
              width={BAR_W} height={barH}
              rx={4}
              fill={isCur ? 'url(#barGradCur)' : 'url(#barGrad)'}
              opacity={isCur ? 1 : 0.7}
            />
            <text
              x={x + BAR_W / 2} y={H - 2}
              textAnchor="middle"
              fontSize="9" fontWeight="700"
              fill="currentColor" opacity="0.45"
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
