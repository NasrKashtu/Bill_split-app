import { useState } from 'react'
import {
  Camera, CalendarDays, RefreshCcw, Paperclip,
  Sparkles, ChevronDown, Home, Zap, Wifi, Droplets, MoreHorizontal,
} from 'lucide-react'
import TopBar       from '../components/TopBar'
import MemberAvatar from '../components/MemberAvatar'
import BottomNav    from '../components/BottomNav'
import { members }  from '../data/mockData'
import { ICON_COLORS } from '../data/theme'

const BILL_TYPES = [
  { id: 'rent',        label: 'Rent',        icon: Home,     color: 'purple' },
  { id: 'electricity', label: 'Electricity', icon: Zap,      color: 'amber'  },
  { id: 'water',       label: 'Water',       icon: Droplets, color: 'red'    },
  { id: 'internet',    label: 'Internet',    icon: Wifi,     color: 'teal'   },
  { id: 'other',       label: 'Other',       icon: MoreHorizontal, color: 'gray' },
]

const SPLIT_TYPES = ['Equal', 'Percentage', 'Weighted']

export default function CreateBill() {
  const [billType,   setBillType]   = useState('electricity')
  const [amount,     setAmount]     = useState('')
  const [dueDate,    setDueDate]    = useState('')
  const [recurring,  setRecurring]  = useState(false)
  const [splitType,  setSplitType]  = useState('Equal')
  const [scanning,   setScanning]   = useState(false)
  const [scanned,    setScanned]    = useState(false)

  const parsed    = parseFloat(amount) || 0
  const shareEq   = members.length > 0 ? (parsed / members.length) : 0

  function doScan() {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanned(true)
      setAmount('272.00')
      setDueDate('2026-06-28')
      setBillType('electricity')
    }, 1800)
  }

  const selectedType = BILL_TYPES.find(t => t.id === billType) ?? BILL_TYPES[0]
  const TypeIcon     = selectedType.icon
  const typeColors   = ICON_COLORS[selectedType.color] ?? ICON_COLORS.purple

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--c-bg)' }}>

      {/* ── TOP BAR ── */}
      <TopBar
        variant="detail"
        title="New bill"
        subtitle={`June 2026`}
        rightAction={
          <button
            className="text-[13px] font-medium px-3 py-1.5 rounded-[8px] tap-active"
            style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}
          >
            Save
          </button>
        }
      />

      {/* ── SCROLL ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── AI SCAN CARD ── */}
        <div
          className="mx-[14px] rounded-[12px] p-4 border-h anim-up"
          style={{ background: 'var(--c-surface)' }}
        >
          {scanned ? (
            <div className="flex items-center gap-3">
              <div
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'var(--teal-50)' }}
              >
                <Sparkles size={18} strokeWidth={1.75} style={{ color: 'var(--teal-400)' }} />
              </div>
              <div>
                <p className="text-[13px] font-medium" style={{ color: 'var(--teal-800)' }}>
                  Invoice scanned
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--teal-600)' }}>
                  Amount, date and type auto-filled from invoice.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0"
                style={{ background: 'var(--purple-50)' }}
              >
                <Camera size={18} strokeWidth={1.75} style={{ color: 'var(--purple-600)' }} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>
                  Scan invoice with AI
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--c-t3)' }}>
                  Auto-fills amount, due date, and bill type
                </p>
              </div>
              <button
                onClick={doScan}
                disabled={scanning}
                className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium tap-active"
                style={{ background: 'var(--purple-50)', color: 'var(--purple-600)' }}
              >
                {scanning ? 'Scanning…' : 'Scan'}
              </button>
            </div>
          )}
        </div>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-3 mx-[14px] my-4">
          <div className="flex-1 h-[0.5px]" style={{ background: 'var(--c-border)' }} />
          <p className="text-[11px]" style={{ color: 'var(--c-t3)' }}>or fill in manually</p>
          <div className="flex-1 h-[0.5px]" style={{ background: 'var(--c-border)' }} />
        </div>

        {/* ── BILL TYPE ── */}
        <div
          className="mx-[14px] rounded-[12px] border-h overflow-hidden anim-up d1"
          style={{ background: 'var(--c-surface)' }}
        >
          <p className="px-4 pt-3 pb-2 text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--c-t3)' }}>
            Bill type
          </p>
          <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 pb-3">
            {BILL_TYPES.map(t => {
              const active  = t.id === billType
              const ic      = ICON_COLORS[t.color]
              const TIcon   = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setBillType(t.id)}
                  className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-[10px] border-h shrink-0 tap-active"
                  style={{
                    background: active ? ic.bg : 'var(--c-surface2)',
                    borderColor: active ? ic.color : 'var(--c-border)',
                  }}
                >
                  <TIcon size={18} strokeWidth={1.75} color={active ? ic.color : 'var(--c-t3)'} />
                  <span className="text-[10px] font-medium" style={{ color: active ? ic.color : 'var(--c-t3)' }}>
                    {t.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── AMOUNT + DATE + RECURRING ── */}
        <div
          className="mx-[14px] mt-2 rounded-[12px] border-h overflow-hidden anim-up d2"
          style={{ background: 'var(--c-surface)' }}
        >
          {/* Total amount */}
          <div className="px-4 py-3 border-hb">
            <p className="text-[11px] mb-1" style={{ color: 'var(--c-t3)' }}>Total amount</p>
            <div className="flex items-baseline gap-2">
              <span className="text-[16px] font-medium" style={{ color: 'var(--c-t2)' }}>RM</span>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 text-[24px] font-medium bg-transparent outline-none"
                style={{ color: 'var(--c-t1)' }}
              />
            </div>
          </div>

          {/* Due date */}
          <div className="px-4 py-3 border-hb flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} strokeWidth={1.75} style={{ color: 'var(--c-t3)' }} />
              <p className="text-[11px]" style={{ color: 'var(--c-t3)' }}>Due date</p>
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="text-[13px] font-medium bg-transparent outline-none text-right"
              style={{ color: 'var(--c-t1)' }}
            />
          </div>

          {/* Recurring toggle */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCcw size={14} strokeWidth={1.75} style={{ color: 'var(--c-t3)' }} />
              <p className="text-[13px]" style={{ color: 'var(--c-t1)' }}>Repeat monthly</p>
            </div>
            <button
              onClick={() => setRecurring(r => !r)}
              className="w-[44px] h-[24px] rounded-full relative transition-all duration-200 tap-active"
              style={{ background: recurring ? 'var(--teal-400)' : 'var(--c-surface2)' }}
            >
              <span
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-200"
                style={{ left: recurring ? '23px' : '3px' }}
              />
            </button>
          </div>
        </div>

        {/* ── ATTACH INVOICE ── */}
        <button
          className="mx-[14px] mt-2 w-[calc(100%-28px)] flex items-center gap-3 px-4 py-3 rounded-[12px] border-h tap-active anim-up d2"
          style={{ background: 'var(--c-surface)' }}
        >
          <Paperclip size={15} strokeWidth={1.75} style={{ color: 'var(--c-t2)' }} />
          <span className="text-[13px]" style={{ color: 'var(--c-t2)' }}>Attach invoice</span>
          <span className="ml-auto text-[11px]" style={{ color: 'var(--c-t3)' }}>Optional</span>
        </button>

        {/* ── SPLIT SETTINGS ── */}
        <p className="px-[14px] pt-5 pb-2 text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--c-t3)' }}>
          Split settings
        </p>

        <div
          className="mx-[14px] rounded-[12px] border-h overflow-hidden anim-up d3"
          style={{ background: 'var(--c-surface)' }}
        >
          {/* Split type selector */}
          <div className="flex border-hb">
            {SPLIT_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSplitType(type)}
                className="flex-1 py-[10px] text-[12px] font-medium tap-active"
                style={{
                  color: splitType === type ? 'var(--purple-600)' : 'var(--c-t3)',
                  background: splitType === type ? 'var(--purple-50)' : 'transparent',
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* AI suggest */}
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 border-hb tap-active text-[12px] font-medium"
            style={{ color: 'var(--purple-600)', background: 'var(--c-surface2)' }}
          >
            <Sparkles size={13} strokeWidth={1.75} />
            Let AI suggest a fair split
          </button>

          {/* Member shares — equal split preview */}
          {splitType === 'Equal' && (
            <div>
              {members.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i < members.length - 1 ? 'border-hb' : ''}`}
                >
                  <MemberAvatar initials={m.initials} color={m.color} size="sm" />
                  <p className="flex-1 text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>{m.name}</p>
                  <p className="text-[13px] font-medium" style={{ color: 'var(--c-t2)' }}>
                    {parsed > 0 ? `RM ${shareEq.toFixed(2)}` : '—'}
                  </p>
                  <p className="text-[11px] w-[32px] text-right" style={{ color: 'var(--c-t3)' }}>25%</p>
                </div>
              ))}
            </div>
          )}

          {/* Percentage split input */}
          {splitType === 'Percentage' && (
            <div>
              {members.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i < members.length - 1 ? 'border-hb' : ''}`}
                >
                  <MemberAvatar initials={m.initials} color={m.color} size="sm" />
                  <p className="flex-1 text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>{m.name}</p>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      defaultValue={25}
                      min={0}
                      max={100}
                      className="w-[48px] text-right text-[13px] font-medium bg-transparent outline-none border-hb"
                      style={{ color: 'var(--c-t1)' }}
                    />
                    <span className="text-[12px]" style={{ color: 'var(--c-t3)' }}>%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Weighted split */}
          {splitType === 'Weighted' && (
            <div className="px-4 py-3">
              <p className="text-[12px]" style={{ color: 'var(--c-t2)' }}>
                Weights are based on room size or custom ratios. Edit each member's weight below.
              </p>
              {members.map((m, i) => (
                <div key={m.id} className="flex items-center gap-3 mt-3">
                  <MemberAvatar initials={m.initials} color={m.color} size="sm" />
                  <p className="flex-1 text-[13px]" style={{ color: 'var(--c-t1)' }}>{m.name}</p>
                  <input
                    type="number"
                    defaultValue={1}
                    min={0.1}
                    step={0.1}
                    className="w-[48px] text-right text-[13px] font-medium bg-transparent outline-none"
                    style={{ color: 'var(--c-t1)', borderBottom: '0.5px solid var(--c-border)' }}
                  />
                  <span className="text-[12px]" style={{ color: 'var(--c-t3)' }}>× weight</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── LIVE PREVIEW ── */}
        {parsed > 0 && (
          <div className="mx-[14px] mt-3 anim-down">
            <p className="text-[11px] font-medium uppercase tracking-wide pb-2" style={{ color: 'var(--c-t3)' }}>
              Preview — each member owes
            </p>
            <div
              className="rounded-[12px] border-h overflow-hidden"
              style={{ background: 'var(--c-surface)' }}
            >
              {members.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i < members.length - 1 ? 'border-hb' : ''}`}
                >
                  <MemberAvatar initials={m.initials} color={m.color} size="sm" />
                  <p className="flex-1 text-[13px]" style={{ color: 'var(--c-t1)' }}>{m.name}</p>
                  <p className="text-[14px] font-medium" style={{ color: 'var(--purple-600)' }}>
                    RM {shareEq.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BOTTOM CTA ── */}
        <div className="mx-[14px] mt-4 mb-5">
          <button
            className="w-full py-[13px] rounded-[12px] text-[14px] font-medium tap-active"
            style={{ background: 'var(--purple-600)', color: '#fff' }}
          >
            Create bill &amp; notify members
          </button>
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav active="bills" role="manager" />
    </div>
  )
}
