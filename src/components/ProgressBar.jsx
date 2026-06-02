import { BAR_COLOR } from '../data/theme'

export default function ProgressBar({
  pct = 0,
  color = 'purple',
  height = 4,
  width,          // optional fixed width in px; defaults to 100%
  animClass = '',
  className = '',
}) {
  const fill = BAR_COLOR[color] ?? BAR_COLOR.purple
  const trackStyle = {
    height: `${height}px`,
    background: 'var(--c-surface2)',
    ...(width ? { width: `${width}px` } : {}),
  }
  return (
    <div
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      style={trackStyle}
    >
      <div
        className={`h-full rounded-full bar-fill ${animClass}`}
        style={{ width: `${Math.min(pct, 100)}%`, background: fill }}
      />
    </div>
  )
}
