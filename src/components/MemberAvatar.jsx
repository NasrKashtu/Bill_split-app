import { AVATAR_BG } from '../data/theme'

const SIZES = {
  xs:  'w-[20px] h-[20px] text-[8px]',
  sm:  'w-[28px] h-[28px] text-[11px]',
  md:  'w-[32px] h-[32px] text-[12px]',
  lg:  'w-[36px] h-[36px] text-[13px]',
  xl:  'w-[44px] h-[44px] text-[15px]',
}

export default function MemberAvatar({ initials, color = 'purple', size = 'md', className = '' }) {
  const bg = AVATAR_BG[color] ?? AVATAR_BG.purple
  const sz = SIZES[size] ?? SIZES.md
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-bold text-white shrink-0 select-none ${className}`}
      style={{ background: bg }}
    >
      {initials}
    </div>
  )
}
