import { useNavigate }  from 'react-router-dom'
import { Plus, Lock, Home, Zap, Wifi, Droplets, FileText, ChevronRight } from 'lucide-react'
import TopBar       from '../components/TopBar'
import SectionLabel  from '../components/SectionLabel'
import StatusPill    from '../components/StatusPill'
import MemberAvatar  from '../components/MemberAvatar'
import BottomNav     from '../components/BottomNav'
import { managerBills, attentionItems, house } from '../data/mockData'
import { ICON_COLORS, STATUS } from '../data/theme'

const ICONS = { Home, Zap, Wifi, Droplets, FileText }

// small avatar with status ring
function MiniStatusAvatar({ initials, color, status }) {
  const s = STATUS[status] ?? STATUS.pending
  return (
    <div className="relative">
      <MemberAvatar initials={initials} color={color} size="xs" />
      <span
        className="absolute -bottom-[1px] -right-[1px] w-[8px] h-[8px] rounded-full border border-white"
        style={{ background: s.bg, borderColor: 'var(--c-surface)' }}
      />
    </div>
  )
}

function ManagerBillCard({ bill, index }) {
  const navigate = useNavigate()
  const Icon     = ICONS[bill.icon] ?? FileText
  const colors   = ICON_COLORS[bill.iconColor] ?? ICON_COLORS.purple
  const paid     = bill.memberStatuses.filter(m => m.status === 'confirmed').length
  const total    = bill.memberStatuses.length
  const delays   = ['d1','d2','d3','d4']

  return (
    <button
      onClick={() => navigate(`/bill/${bill.id}`)}
      className={`w-full text-left border-h rounded-[12px] p-[14px] tap-active anim-up ${delays[index] ?? ''}`}
      style={{ background: 'var(--c-surface)' }}
    >
      {/* Top row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center shrink-0"
          style={{ background: colors.bg }}
        >
          <Icon size={16} color={colors.color} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>{bill.name}</p>
          <p className="text-[11px]" style={{ color: 'var(--c-t3)' }}>RM {bill.total} total</p>
        </div>
        <p className="text-[12px]" style={{ color: 'var(--c-t3)' }}>{paid}/{total} paid</p>
        <ChevronRight size={14} strokeWidth={1.5} style={{ color: 'var(--c-t3)' }} />
      </div>

      {/* Member payment grid */}
      <div className="flex gap-2">
        {bill.memberStatuses.map(m => (
          <MiniStatusAvatar key={m.id} initials={m.initials} color={m.color} status={m.status} />
        ))}
        <p className="text-[11px] ml-1 self-center" style={{ color: 'var(--c-t3)' }}>
          {paid === total ? 'All paid' : `${total - paid} pending`}
        </p>
      </div>
    </button>
  )
}

export default function ManagerDashboard() {
  const navigate = useNavigate()

  const allShares    = managerBills.flatMap(b => b.memberStatuses)
  const confirmedAll = allShares.filter(s => s.status === 'confirmed').length
  const totalShares  = allShares.length
  const pct          = Math.round((confirmedAll / totalShares) * 100)
  const monthClosed  = confirmedAll === totalShares

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--c-bg)' }}>

      {/* ── TOP BAR ── */}
      <TopBar
        variant="house"
        title={house.name}
        subtitle={house.month}
      />

      {/* ── SCROLL ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── MONTH STATUS BANNER ── */}
        <div
          className="mx-[14px] rounded-[12px] p-4 border-h anim-up"
          style={{ background: monthClosed ? 'var(--teal-50)' : 'var(--amber-50)' }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[11px] font-medium" style={{ color: monthClosed ? 'var(--teal-600)' : 'var(--amber-600)' }}>
                {house.month}
              </p>
              <p className="text-[15px] font-medium mt-0.5" style={{ color: monthClosed ? 'var(--teal-900)' : 'var(--amber-800)' }}>
                {monthClosed ? 'Month closed' : `${confirmedAll} of ${totalShares} shares confirmed`}
              </p>
            </div>
            {monthClosed && (
              <span
                className="text-[10px] font-medium px-2 py-1 rounded-[8px]"
                style={{ background: 'var(--teal-400)', color: '#fff' }}
              >
                Closed
              </span>
            )}
          </div>
          {/* Progress bar */}
          <div
            className="w-full h-[5px] rounded-full overflow-hidden"
            style={{ background: monthClosed ? 'var(--teal-400)' : 'var(--amber-400)', opacity: 0.2 }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: '100%',
                background: monthClosed ? 'var(--teal-400)' : 'var(--amber-400)',
                opacity: 5,
                borderRadius: 9999,
              }}
            />
          </div>
          <div
            className="h-[5px] rounded-full overflow-hidden mt-[-5px]"
          >
            <div
              className="bar-fill bar-d1 h-full rounded-full"
              style={{ width: `${pct}%`, background: monthClosed ? 'var(--teal-400)' : 'var(--amber-400)' }}
            />
          </div>
          <p className="text-[11px] mt-1.5" style={{ color: monthClosed ? 'var(--teal-600)' : 'var(--amber-600)' }}>
            {pct}% complete
          </p>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="flex gap-2 mx-[14px] mt-3 anim-up d1">
          <button
            onClick={() => navigate('/manager/new-bill')}
            className="flex-1 flex items-center justify-center gap-2 py-[10px] rounded-[10px] border-h tap-active text-[13px] font-medium"
            style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}
          >
            <Plus size={15} strokeWidth={2} />
            New bill
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-[10px] rounded-[10px] border-h tap-active text-[13px] font-medium"
            style={{
              background: monthClosed ? 'var(--teal-50)' : 'var(--c-surface2)',
              color: monthClosed ? 'var(--teal-600)' : 'var(--c-t3)',
            }}
            disabled={!monthClosed}
          >
            <Lock size={15} strokeWidth={1.75} />
            Close month
          </button>
        </div>

        {/* ── BILLS THIS MONTH ── */}
        <SectionLabel>Bills this month</SectionLabel>

        <div className="mx-[14px] flex flex-col gap-2">
          {managerBills.map((bill, i) => (
            <ManagerBillCard key={bill.id} bill={bill} index={i} />
          ))}
        </div>

        {/* ── NEEDS ATTENTION ── */}
        <SectionLabel>Needs attention</SectionLabel>

        <div
          className="mx-[14px] rounded-[12px] overflow-hidden border-h mb-5 anim-up d4"
          style={{ background: 'var(--c-surface)' }}
        >
          {attentionItems.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-[14px] py-3 ${i < attentionItems.length - 1 ? 'border-hb' : ''}`}
            >
              <MemberAvatar initials={item.initials} color={item.color} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>
                  {item.memberName}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--c-t3)' }}>
                  {item.bill} · RM {item.amount}
                </p>
              </div>
              <StatusPill status={item.status} />
              <button
                onClick={() => navigate(`/manager/review/${item.id}`)}
                className="text-[12px] font-medium px-3 py-1.5 rounded-[8px] tap-active ml-1"
                style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}
              >
                Review
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav active="home" role="manager" />
    </div>
  )
}
