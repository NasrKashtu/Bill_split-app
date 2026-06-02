import { ArrowLeft, Bell, Settings, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MemberAvatar from './MemberAvatar'

/**
 * variant="greeting"  — left: greeting+subtitle, right: bell+avatar
 * variant="house"     — left: title+subtitle,    right: bell+settings
 * variant="detail"    — left: back+title+subtitle, right: optional action
 * variant="plain"     — left: title+subtitle,    right: optional icon
 */
export default function TopBar({
  variant = 'greeting',
  greeting,
  title,
  subtitle,
  onBack,
  avatarInitials = 'AF',
  avatarColor = 'purple',
  rightAction,
  className = '',
}) {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <div
      className={`flex items-center justify-between px-[14px] pt-5 pb-3 shrink-0 ${className}`}
    >
      {/* ── LEFT ── */}
      {variant === 'greeting' && (
        <div>
          <p className="text-[16px] font-medium leading-snug" style={{ color: 'var(--c-t1)' }}>
            {greeting ?? title}
          </p>
          {subtitle && (
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--c-t3)' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {variant === 'house' && (
        <div>
          <p className="text-[16px] font-medium leading-snug" style={{ color: 'var(--c-t1)' }}>
            {title}
          </p>
          {subtitle && (
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--c-t3)' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {variant === 'detail' && (
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={handleBack}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 tap-active border-h"
            style={{ background: 'var(--c-surface)' }}
          >
            <ArrowLeft size={16} strokeWidth={1.75} style={{ color: 'var(--c-t2)' }} />
          </button>
          <div className="min-w-0">
            <p className="text-[16px] font-medium leading-snug truncate" style={{ color: 'var(--c-t1)' }}>
              {title}
            </p>
            {subtitle && (
              <p className="text-[11px]" style={{ color: 'var(--c-t3)' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {variant === 'plain' && (
        <div>
          <p className="text-[16px] font-medium leading-snug" style={{ color: 'var(--c-t1)' }}>
            {title}
          </p>
          {subtitle && (
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--c-t3)' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* ── RIGHT ── */}
      <div className="flex items-center gap-1.5 shrink-0">
        {variant === 'greeting' && (
          <>
            <button
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full tap-active"
              style={{ color: 'var(--c-t2)' }}
            >
              <Bell size={18} strokeWidth={1.5} />
            </button>
            <MemberAvatar initials={avatarInitials} color={avatarColor} size="sm" />
          </>
        )}

        {variant === 'house' && (
          <>
            <button
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full tap-active"
              style={{ color: 'var(--c-t2)' }}
            >
              <Bell size={18} strokeWidth={1.5} />
            </button>
            <button
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full tap-active"
              style={{ color: 'var(--c-t2)' }}
            >
              <Settings size={18} strokeWidth={1.5} />
            </button>
          </>
        )}

        {variant === 'plain' && (
          <button
            className="w-[36px] h-[36px] flex items-center justify-center rounded-full tap-active"
            style={{ color: 'var(--c-t2)' }}
          >
            <MoreHorizontal size={18} strokeWidth={1.5} />
          </button>
        )}

        {variant === 'detail' && rightAction && (
          <div>{rightAction}</div>
        )}
      </div>
    </div>
  )
}
