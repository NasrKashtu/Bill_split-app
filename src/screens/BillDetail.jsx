import { useState } from 'react'
import {
  Upload, CheckCircle, XCircle, AlertCircle, Eye,
  Zap, Home, Wifi, Droplets, FileText, Info, RotateCcw,
} from 'lucide-react'
import { useParams } from 'react-router-dom'
import TopBar     from '../components/TopBar'
import StatusPill from '../components/StatusPill'
import BottomNav  from '../components/BottomNav'
import { memberBills } from '../data/mockData'
import { ICON_COLORS }  from '../data/theme'

const ICONS = { Home, Zap, Wifi, Droplets, FileText }

// Demo: cycle through upload states via button tap
const PROOF_STATES = ['none', 'uploaded', 'confirmed', 'rejected']

export default function BillDetail() {
  const { id } = useParams()
  const bill   = memberBills.find(b => b.id === id) ?? memberBills[1] // default to electricity
  const [proofState, setProofState] = useState('none')

  const Icon   = ICONS[bill.icon] ?? FileText
  const colors = ICON_COLORS[bill.iconColor] ?? ICON_COLORS.purple

  function cycleState() {
    setProofState(s => {
      const i = PROOF_STATES.indexOf(s)
      return PROOF_STATES[(i + 1) % PROOF_STATES.length]
    })
  }

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--c-bg)' }}>

      {/* ── TOP BAR ── */}
      <TopBar
        variant="detail"
        title={`${bill.name} bill`}
        subtitle="June 2026"
      />

      {/* ── SCROLL ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── BILL SUMMARY CARD ── */}
        <div
          className="mx-[14px] rounded-[12px] p-4 border-h anim-up"
          style={{ background: 'var(--c-surface)' }}
        >
          {/* Icon + status pill row */}
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center"
              style={{ background: colors.bg }}
            >
              <Icon size={18} color={colors.color} strokeWidth={1.75} />
            </div>
            <StatusPill status={bill.status} />
          </div>

          {/* Large amount */}
          <p className="text-[28px] font-medium leading-none" style={{ color: 'var(--c-t1)' }}>
            RM {bill.myShare}
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--c-t3)' }}>
            My share · due {bill.dueDate}
          </p>

          {/* Hairline divider */}
          <div className="border-hb my-3" />

          {/* Split breakdown */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px]" style={{ color: 'var(--c-t2)' }}>
                Your share: 25% of RM {bill.total} total
              </p>
            </div>
            <button className="text-[11px] font-medium tap-active" style={{ color: 'var(--purple-600)' }}>
              Why this amount?
            </button>
          </div>
        </div>

        {/* ── INVOICE SECTION ── */}
        <p className="px-[14px] pt-4 pb-2 text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--c-t3)' }}>
          Original invoice
        </p>

        <div
          className="mx-[14px] rounded-[12px] border-h overflow-hidden anim-up d1"
          style={{ background: 'var(--c-surface)' }}
        >
          <div
            className="h-[80px] flex items-center justify-center gap-3 border-hb"
            style={{ background: 'var(--c-surface2)' }}
          >
            <FileText size={22} strokeWidth={1.5} style={{ color: 'var(--c-t3)' }} />
            <p className="text-[12px]" style={{ color: 'var(--c-t2)' }}>Invoice_June2026.pdf</p>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 py-3 tap-active text-[13px] font-medium"
            style={{ color: 'var(--purple-600)' }}
          >
            <Eye size={14} strokeWidth={1.75} />
            View invoice
          </button>
        </div>

        {/* ── PAYMENT PROOF SECTION ── */}
        <div className="flex items-center justify-between px-[14px] pt-4 pb-2">
          <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--c-t3)' }}>
            Payment proof
          </p>
          {/* Demo cycle button */}
          <button
            onClick={cycleState}
            className="text-[10px] px-2 py-1 rounded-[6px] tap-active"
            style={{ background: 'var(--c-surface2)', color: 'var(--c-t3)' }}
          >
            Demo: cycle states
          </button>
        </div>

        {/* ── STATE: none ── */}
        {proofState === 'none' && (
          <button
            onClick={cycleState}
            className="mx-[14px] rounded-[12px] border-[1.5px] border-dashed flex flex-col items-center justify-center gap-2 py-8 tap-active anim-up"
            style={{ borderColor: 'var(--c-t3)', background: 'var(--c-surface)' }}
          >
            <div
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
              style={{ background: 'var(--purple-50)' }}
            >
              <Upload size={18} strokeWidth={1.75} style={{ color: 'var(--purple-600)' }} />
            </div>
            <p className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>
              Tap to upload your payment proof
            </p>
            <p className="text-[11px]" style={{ color: 'var(--c-t3)' }}>
              JPG, PNG or PDF · max 10 MB
            </p>
          </button>
        )}

        {/* ── STATE: uploaded (awaiting review) ── */}
        {proofState === 'uploaded' && (
          <div
            className="mx-[14px] rounded-[12px] border-h overflow-hidden anim-up"
            style={{ background: 'var(--c-surface)' }}
          >
            <div
              className="h-[80px] flex items-center justify-center border-hb"
              style={{ background: 'var(--c-surface2)' }}
            >
              <FileText size={24} strokeWidth={1.25} style={{ color: 'var(--c-t3)' }} />
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium" style={{ color: 'var(--c-t1)' }}>Uploaded 3 Jun · awaiting review</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--c-t3)' }}>Receipt_electricity_jun.jpg</p>
              </div>
              <button className="text-[12px] font-medium tap-active" style={{ color: 'var(--purple-600)' }}>
                Replace
              </button>
            </div>
            {/* AI check note */}
            <div
              className="mx-3 mb-3 px-3 py-2.5 rounded-[8px] flex items-start gap-2"
              style={{ background: 'var(--teal-50)' }}
            >
              <Info size={14} strokeWidth={1.75} style={{ color: 'var(--teal-600)', marginTop: 1 }} />
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--teal-600)' }}>
                AI checked: amount matches bill. Sent to manager for review.
              </p>
            </div>
          </div>
        )}

        {/* ── STATE: confirmed ── */}
        {proofState === 'confirmed' && (
          <div
            className="mx-[14px] rounded-[12px] border-h p-4 flex items-center gap-3 anim-up"
            style={{ background: 'var(--c-surface)' }}
          >
            <div
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'var(--teal-50)' }}
            >
              <CheckCircle size={20} strokeWidth={1.75} style={{ color: 'var(--teal-400)' }} />
            </div>
            <div>
              <p className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>
                Payment confirmed
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--c-t3)' }}>
                Confirmed by manager on 4 Jun
              </p>
            </div>
          </div>
        )}

        {/* ── STATE: rejected ── */}
        {proofState === 'rejected' && (
          <div
            className="mx-[14px] rounded-[12px] border-h overflow-hidden anim-up"
            style={{ background: 'var(--c-surface)' }}
          >
            <div
              className="px-4 py-3 flex items-start gap-3"
              style={{ background: 'var(--red-50)' }}
            >
              <XCircle size={16} strokeWidth={1.75} style={{ color: 'var(--red-400)', marginTop: 1 }} />
              <div>
                <p className="text-[12px] font-medium" style={{ color: 'var(--red-800)' }}>
                  Proof rejected by manager
                </p>
                <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: 'var(--red-800)', opacity: 0.75 }}>
                  "Amount on receipt (RM 60) doesn't match your share (RM {bill.myShare}). Please re-upload."
                </p>
              </div>
            </div>
            <button
              className="w-full flex items-center justify-center gap-2 py-3 tap-active text-[13px] font-medium"
              style={{ color: 'var(--red-400)' }}
            >
              <RotateCcw size={14} strokeWidth={1.75} />
              Re-upload proof
            </button>
          </div>
        )}

        {/* ── CTA BUTTON ── */}
        <div className="mx-[14px] mt-4 mb-5">
          {proofState === 'none' && (
            <button
              onClick={cycleState}
              className="w-full py-[13px] rounded-[12px] text-[14px] font-medium tap-active"
              style={{ background: 'var(--teal-400)', color: '#fff' }}
            >
              Upload proof
            </button>
          )}
          {proofState === 'uploaded' && (
            <button
              className="w-full py-[13px] rounded-[12px] text-[14px] font-medium cursor-not-allowed"
              style={{ background: 'var(--c-surface2)', color: 'var(--c-t3)' }}
              disabled
            >
              Waiting for manager review
            </button>
          )}
          {proofState === 'rejected' && (
            <button
              onClick={cycleState}
              className="w-full py-[13px] rounded-[12px] text-[14px] font-medium tap-active"
              style={{ background: 'var(--teal-400)', color: '#fff' }}
            >
              Upload new proof
            </button>
          )}
        </div>

      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav active="bills" role="member" />
    </div>
  )
}
