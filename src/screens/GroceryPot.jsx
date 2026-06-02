import { Plus, Minus } from 'lucide-react'
import TopBar          from '../components/TopBar'
import SectionLabel     from '../components/SectionLabel'
import ActivityLogItem  from '../components/ActivityLogItem'
import BottomNav        from '../components/BottomNav'
import { groceryPot, memberContributions, groceryActivity, house } from '../data/mockData'
import { AVATAR_BG } from '../data/theme'

export default function GroceryPot() {
  const { balance, target, spent } = groceryPot
  const pct = Math.round((balance / target) * 100)

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--c-bg)' }}>

      {/* ── TOP BAR ── */}
      <TopBar
        variant="plain"
        title="Grocery pot"
        subtitle={`${house.name} · ${house.month}`}
      />

      {/* ── SCROLL ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── HERO CARD ── */}
        <div
          className="mx-[14px] rounded-[12px] p-4 border-h anim-up"
          style={{ background: 'var(--teal-50)' }}
        >
          <p className="text-[11px] font-medium" style={{ color: 'var(--teal-600)' }}>
            Pot balance
          </p>
          <p
            className="text-[30px] font-medium leading-tight mt-0.5"
            style={{ color: 'var(--teal-900)' }}
          >
            RM {balance.toFixed(2)}
          </p>

          {/* Progress bar */}
          <div className="mt-3">
            <div
              className="w-full h-[6px] rounded-full overflow-hidden"
              style={{ background: 'var(--teal-400)', opacity: 0.15 }}
            >
              <div style={{ width: `${pct}%`, height: '100%', background: 'var(--teal-400)', opacity: 5, borderRadius: 9999 }} />
            </div>
            <div className="h-[6px] rounded-full overflow-hidden mt-[-6px]">
              <div
                className="bar-fill bar-d1 h-full rounded-full"
                style={{ width: `${pct}%`, background: 'var(--teal-400)' }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-5 mt-3">
            <div>
              <p className="text-[11px]" style={{ color: 'var(--teal-600)' }}>Target</p>
              <p className="text-[13px] font-medium" style={{ color: 'var(--teal-900)' }}>
                RM {target} / month
              </p>
            </div>
            <div>
              <p className="text-[11px]" style={{ color: 'var(--teal-600)' }}>Spent</p>
              <p className="text-[13px] font-medium" style={{ color: 'var(--teal-900)' }}>
                RM {spent.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div className="flex gap-2 mx-[14px] mt-3 anim-up d1">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-[11px] rounded-[10px] border-h tap-active text-[13px] font-medium"
            style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}
          >
            <Plus size={15} strokeWidth={2} />
            Top up
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-[11px] rounded-[10px] border-h tap-active text-[13px] font-medium"
            style={{ background: 'var(--c-surface)', color: 'var(--c-t2)' }}
          >
            <Minus size={15} strokeWidth={2} />
            Log spend
          </button>
        </div>

        {/* ── MEMBER CONTRIBUTIONS ── */}
        <SectionLabel>Member contributions</SectionLabel>

        <div className="px-[14px] flex flex-wrap gap-2 anim-up d2">
          {memberContributions.map(m => (
            <div
              key={m.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border-h"
              style={{ background: 'var(--c-surface)' }}
            >
              <span
                className="w-[7px] h-[7px] rounded-full shrink-0"
                style={{ background: AVATAR_BG[m.color] }}
              />
              <span className="text-[12px] font-medium" style={{ color: 'var(--c-t1)' }}>
                {m.name}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--c-t3)' }}>
                RM {m.amount}
              </span>
            </div>
          ))}
        </div>

        {/* ── RECENT ACTIVITY ── */}
        <SectionLabel>Recent activity</SectionLabel>

        <div
          className="mx-[14px] rounded-[12px] overflow-hidden border-h mb-5 anim-up d3"
          style={{ background: 'var(--c-surface)' }}
        >
          {groceryActivity.map((item, i) => (
            <ActivityLogItem
              key={item.id}
              item={item}
              isLast={i === groceryActivity.length - 1}
            />
          ))}
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav active="pot" role="member" />
    </div>
  )
}
