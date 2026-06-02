import { useNavigate, useLocation } from 'react-router-dom'
import { Home, FileText, ShoppingBasket, User, Users, Settings } from 'lucide-react'

const MEMBER_TABS = [
  { id: 'home',    label: 'Home',    icon: Home,           path: '/' },
  { id: 'bills',   label: 'Bills',   icon: FileText,       path: '/bills' },
  { id: 'pot',     label: 'Pot',     icon: ShoppingBasket, path: '/grocery' },
  { id: 'profile', label: 'Profile', icon: User,           path: '/profile' },
]

const MANAGER_TABS = [
  { id: 'home',     label: 'Home',    icon: Home,     path: '/manager' },
  { id: 'bills',    label: 'Bills',   icon: FileText, path: '/manager/bills' },
  { id: 'members',  label: 'Members', icon: Users,    path: '/manager/members' },
  { id: 'settings', label: 'Settings',icon: Settings, path: '/manager/settings' },
]

export default function BottomNav({ active, role = 'member' }) {
  const navigate = useNavigate()
  const tabs = role === 'manager' ? MANAGER_TABS : MEMBER_TABS

  const activeColor   = role === 'manager' ? 'var(--purple-600)' : 'var(--purple-600)'
  const potActiveColor = 'var(--teal-600)'

  return (
    <nav
      className="shrink-0 flex justify-around items-center border-ht"
      style={{ background: 'var(--c-surface)', paddingBottom: 'env(safe-area-inset-bottom, 8px)', paddingTop: '8px' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        const isPot    = tab.id === 'pot'
        const color    = isActive ? (isPot ? potActiveColor : activeColor) : 'var(--c-t3)'
        const Icon     = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-[3px] py-1 px-4 min-h-[44px] justify-center tap-active"
          >
            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} style={{ color }} />
            <span
              className="text-[10px] font-medium"
              style={{ color }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
