import { STATUS } from '../data/theme'

export default function StatusPill({ status, className = '' }) {
  const cfg = STATUS[status] ?? STATUS.pending
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[10px] text-[10px] font-medium leading-none whitespace-nowrap ${className}`}
      style={{ background: cfg.bg, color: cfg.color }}
    >
      <span
        className="w-[5px] h-[5px] rounded-full shrink-0"
        style={{ background: cfg.color }}
      />
      {cfg.label}
    </span>
  )
}
