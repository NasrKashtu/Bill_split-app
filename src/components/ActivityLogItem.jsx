import {
  ShoppingCart, ArrowUp, Package, ArrowDown,
  Receipt, Coffee, Home, Zap, Wifi, Droplets,
} from 'lucide-react'
import { ICON_COLORS } from '../data/theme'

const ICONS = {
  ShoppingCart, ArrowUp, ArrowDown, Package,
  Receipt, Coffee, Home, Zap, Wifi, Droplets,
}

export default function ActivityLogItem({ item, isLast = false }) {
  const { icon, iconColor, name, who, when, amount } = item
  const Icon   = ICONS[icon] ?? ShoppingCart
  const colors = ICON_COLORS[iconColor] ?? ICON_COLORS.teal
  const isPos  = amount > 0

  return (
    <div className={`flex items-center gap-3 py-3 px-[14px] ${isLast ? '' : 'border-hb'}`}>
      {/* Icon square */}
      <div
        className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center shrink-0"
        style={{ background: colors.bg }}
      >
        <Icon size={16} color={colors.color} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium leading-snug truncate" style={{ color: 'var(--c-t1)' }}>
          {name}
        </p>
        <p className="text-[11px] leading-snug mt-0.5" style={{ color: 'var(--c-t3)' }}>
          {who} · {when}
        </p>
      </div>

      {/* Amount */}
      <span
        className="text-[13px] font-semibold shrink-0"
        style={{ color: isPos ? 'var(--teal-600)' : 'var(--red-400)' }}
      >
        {isPos ? '+' : '−'}RM {Math.abs(amount).toFixed(2)}
      </span>
    </div>
  )
}
