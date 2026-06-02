import { useNavigate } from 'react-router-dom'
import { Home, Zap, Wifi, Droplets, FileText, ChevronRight } from 'lucide-react'
import { ICON_COLORS } from '../data/theme'
import StatusPill from './StatusPill'

const ICONS = { Home, Zap, Wifi, Droplets, FileText }

export default function BillRow({ bill, animClass = '', onClick }) {
  const navigate = useNavigate()
  const { id, name, icon, iconColor, myShare, meta, status } = bill
  const Icon   = ICONS[icon] ?? FileText
  const colors = ICON_COLORS[iconColor] ?? ICON_COLORS.purple

  const handleTap = onClick ?? (() => navigate(`/bill/${id}`))

  return (
    <button
      onClick={handleTap}
      className={`w-full flex items-center gap-3 px-[14px] py-[13px] tap-active border-hb text-left ${animClass}`}
    >
      {/* Icon square */}
      <div
        className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center shrink-0"
        style={{ background: colors.bg }}
      >
        <Icon size={16} color={colors.color} strokeWidth={1.75} />
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium leading-snug" style={{ color: 'var(--c-t1)' }}>
          {name}
        </p>
        <p className="text-[11px] mt-0.5 leading-snug truncate" style={{ color: 'var(--c-t3)' }}>
          {meta}
        </p>
      </div>

      {/* Amount + pill */}
      <div className="flex flex-col items-end gap-[5px] shrink-0">
        <span className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>
          RM {myShare}
        </span>
        <StatusPill status={status} />
      </div>

      {/* Chevron */}
      <ChevronRight size={14} strokeWidth={1.5} style={{ color: 'var(--c-t3)', marginLeft: -4 }} />
    </button>
  )
}
