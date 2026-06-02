import { Flame } from 'lucide-react'
import TopBar      from '../components/TopBar'
import SectionLabel from '../components/SectionLabel'
import BillRow      from '../components/BillRow'
import MemberAvatar from '../components/MemberAvatar'
import ProgressBar  from '../components/ProgressBar'
import BottomNav    from '../components/BottomNav'
import { memberBills, memberProgress, house } from '../data/mockData'

const barDelays = ['bar-d1', 'bar-d2', 'bar-d3', 'bar-d4']
const rowDelays = ['d1','d2','d3','d4']

export default function MemberHome() {
  const totalOwed     = memberBills.reduce((s, b) => s + b.myShare, 0)
  const confirmedCount = memberBills.filter(b => b.status === 'confirmed' || b.status === 'awaiting-review').length

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--c-bg)' }}>

      {/* ── TOP BAR ── */}
      <TopBar
        variant="greeting"
        greeting="Good morning, Ahmad"
        subtitle={`${house.name} · ${house.month}`}
      />

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── HERO CARD ── */}
        <div
          className="mx-[14px] rounded-[12px] p-4 border-h anim-up"
          style={{ background: 'var(--purple-50)' }}
        >
          <div className="flex items-start justify-between gap-3">
            {/* Left */}
            <div>
              <p className="text-[11px] font-medium" style={{ color: 'var(--purple-600)' }}>
                My total this month
              </p>
              <p
                className="text-[28px] font-medium leading-tight mt-0.5"
                style={{ color: 'var(--purple-900)' }}
              >
                RM {totalOwed}
              </p>
              <p className="text-[11px] mt-1" style={{ color: 'var(--purple-600)' }}>
                {confirmedCount} of {memberBills.length} bills confirmed · due 28 Jun
              </p>
            </div>

            {/* Streak badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] shrink-0 border-h"
              style={{ background: 'var(--amber-50)' }}
            >
              <Flame size={13} strokeWidth={1.75} style={{ color: 'var(--amber-600)' }} />
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold leading-none" style={{ color: 'var(--amber-800)' }}>
                  3 month
                </span>
                <span className="text-[10px] leading-none mt-0.5" style={{ color: 'var(--amber-600)' }}>
                  streak
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MY BILLS ── */}
        <SectionLabel>My bills</SectionLabel>

        <div
          className="mx-[14px] rounded-[12px] overflow-hidden border-h anim-up d1"
          style={{ background: 'var(--c-surface)' }}
        >
          {memberBills.map((bill, i) => (
            <BillRow
              key={bill.id}
              bill={bill}
              animClass={`anim-up ${rowDelays[i]}`}
            />
          ))}
        </div>

        {/* ── HOUSE STATUS ── */}
        <SectionLabel>House status</SectionLabel>

        <div
          className="mx-[14px] rounded-[12px] overflow-hidden border-h anim-up d3 mb-5"
          style={{ background: 'var(--c-surface)' }}
        >
          {/* Card header */}
          <div
            className="flex items-center justify-between px-[14px] py-3 border-hb"
          >
            <p className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>
              {house.name}
            </p>
            <p className="text-[11px]" style={{ color: 'var(--c-t3)' }}>
              {house.month}
            </p>
          </div>

          {/* Member rows */}
          {memberProgress.map((m, i) => (
            <div
              key={m.id}
              className={`flex items-center gap-3 px-[14px] py-3 ${i < memberProgress.length - 1 ? 'border-hb' : ''}`}
            >
              <MemberAvatar initials={m.initials} color={m.color} size="sm" />
              <p className="text-[13px] font-medium w-[60px] shrink-0" style={{ color: 'var(--c-t1)' }}>
                {m.name}
                {m.isSelf && (
                  <span className="text-[10px] font-normal ml-1" style={{ color: 'var(--c-t3)' }}>you</span>
                )}
              </p>
              <ProgressBar
                pct={m.pct}
                color={m.pct === 0 ? 'gray' : m.color}
                height={4}
                className="flex-1"
                animClass={barDelays[i]}
              />
              <p
                className="text-[12px] font-medium w-[32px] text-right shrink-0"
                style={{ color: m.pct === 0 ? 'var(--red-400)' : 'var(--c-t2)' }}
              >
                {m.pct}%
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav active="home" role="member" />
    </div>
  )
}
