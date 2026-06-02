import { useState } from 'react'
import {
  AlertTriangle, CheckCircle, FileText, Check, X, MessageSquare,
} from 'lucide-react'
import TopBar        from '../components/TopBar'
import MemberAvatar  from '../components/MemberAvatar'
import BottomNav     from '../components/BottomNav'
import { proofReviewData } from '../data/mockData'

export default function ProofReview() {
  const { member, bill, billTotal, myShare, uploadedAt, aiCheck } = proofReviewData
  const [action, setAction]        = useState(null)   // null | 'approving' | 'approved' | 'correcting' | 'rejecting'
  const [rejectNote, setRejectNote] = useState('')

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--c-bg)' }}>

      {/* ── TOP BAR ── */}
      <TopBar variant="detail" title="Review proof" subtitle="Manager" />

      {/* ── SCROLL ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        {/* ── CONTEXT CARD ── */}
        <div
          className="mx-[14px] rounded-[12px] p-4 border-h anim-up flex items-center gap-3"
          style={{ background: 'var(--c-surface)' }}
        >
          <MemberAvatar initials={member.initials} color={member.color} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-medium" style={{ color: 'var(--c-t1)' }}>
              {member.name}
            </p>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--c-t2)' }}>
              {bill} bill · RM {myShare} share
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--c-t3)' }}>
              Uploaded {uploadedAt}
            </p>
          </div>
        </div>

        {/* ── AI PRE-CHECK ── */}
        <div
          className={`mx-[14px] mt-3 rounded-[12px] p-4 border-h anim-up d1 flex items-start gap-3`}
          style={{ background: aiCheck.passed ? 'var(--teal-50)' : 'var(--amber-50)' }}
        >
          <div
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0"
            style={{ background: aiCheck.passed ? 'var(--teal-400)' : 'var(--amber-400)' }}
          >
            {aiCheck.passed
              ? <CheckCircle size={18} strokeWidth={2} color="#fff" />
              : <AlertTriangle size={18} strokeWidth={2} color="#fff" />
            }
          </div>
          <div>
            <p
              className="text-[13px] font-medium"
              style={{ color: aiCheck.passed ? 'var(--teal-800)' : 'var(--amber-800)' }}
            >
              {aiCheck.passed ? 'AI check passed' : 'AI flagged — review carefully'}
            </p>
            <p
              className="text-[11px] mt-0.5 leading-relaxed"
              style={{ color: aiCheck.passed ? 'var(--teal-600)' : 'var(--amber-600)' }}
            >
              {aiCheck.passed
                ? `Amount matches bill (RM ${myShare}).`
                : `Uploaded amount (RM ${aiCheck.uploadedAmount.toFixed(2)}) doesn't match bill (RM ${aiCheck.expectedAmount.toFixed(2)}).`
              }
            </p>
          </div>
        </div>

        {/* ── PROOF IMAGE PLACEHOLDER ── */}
        <p className="px-[14px] pt-4 pb-2 text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--c-t3)' }}>
          Payment receipt
        </p>

        <div
          className="mx-[14px] rounded-[12px] border-h overflow-hidden anim-up d2"
          style={{ background: 'var(--c-surface)' }}
        >
          {/* Receipt mock */}
          <div
            className="h-[180px] flex flex-col items-center justify-center gap-2"
            style={{ background: 'var(--c-surface2)' }}
          >
            <FileText size={32} strokeWidth={1.25} style={{ color: 'var(--c-t3)' }} />
            <p className="text-[12px]" style={{ color: 'var(--c-t2)' }}>Receipt_electricity_jun.jpg</p>
            <div
              className="mt-2 px-4 py-1 rounded-[8px] border-h text-[11px]"
              style={{ background: 'var(--c-surface)', color: 'var(--c-t2)' }}
            >
              Tap to expand
            </div>
          </div>

          {/* Amount shown on receipt */}
          <div className="px-4 py-3 flex items-center justify-between border-ht">
            <p className="text-[12px]" style={{ color: 'var(--c-t2)' }}>Amount on receipt</p>
            <p
              className="text-[14px] font-medium"
              style={{ color: aiCheck.passed ? 'var(--teal-400)' : 'var(--red-400)' }}
            >
              RM {aiCheck.uploadedAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* ── ACTION BUTTONS ── */}
        {action === null && (
          <div className="mx-[14px] mt-4 flex flex-col gap-2 anim-up d3">
            <button
              onClick={() => setAction('approved')}
              className="w-full py-[13px] rounded-[12px] text-[14px] font-medium tap-active"
              style={{ background: 'var(--teal-400)', color: '#fff' }}
            >
              Approve
            </button>
            <button
              onClick={() => setAction('correcting')}
              className="w-full py-[13px] rounded-[12px] text-[14px] font-medium tap-active border-h"
              style={{ background: 'var(--amber-50)', color: 'var(--amber-800)' }}
            >
              Request correction
            </button>
            <button
              onClick={() => setAction('rejecting')}
              className="w-full py-[13px] rounded-[12px] text-[14px] font-medium tap-active border-h"
              style={{ background: 'var(--c-surface)', color: 'var(--red-400)' }}
            >
              Reject
            </button>
          </div>
        )}

        {/* ── CORRECTION NOTE INPUT ── */}
        {action === 'correcting' && (
          <div className="mx-[14px] mt-4 anim-down">
            <div
              className="rounded-[12px] border-h overflow-hidden"
              style={{ background: 'var(--c-surface)' }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-hb">
                <MessageSquare size={14} strokeWidth={1.75} style={{ color: 'var(--amber-400)' }} />
                <p className="text-[13px] font-medium" style={{ color: 'var(--c-t1)' }}>
                  Note to member
                </p>
              </div>
              <textarea
                value={rejectNote}
                onChange={e => setRejectNote(e.target.value)}
                placeholder="Explain what needs correcting…"
                rows={3}
                className="w-full px-4 py-3 text-[13px] bg-transparent outline-none resize-none"
                style={{ color: 'var(--c-t1)' }}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setAction(null)}
                className="flex-1 py-[11px] rounded-[10px] border-h text-[13px] font-medium tap-active"
                style={{ background: 'var(--c-surface)', color: 'var(--c-t2)' }}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-[11px] rounded-[10px] text-[13px] font-medium tap-active"
                style={{ background: 'var(--amber-50)', color: 'var(--amber-800)' }}
              >
                Send request
              </button>
            </div>
          </div>
        )}

        {/* ── REJECT CONFIRM ── */}
        {action === 'rejecting' && (
          <div className="mx-[14px] mt-4 anim-down">
            <div
              className="rounded-[12px] p-4 border-h"
              style={{ background: 'var(--red-50)' }}
            >
              <p className="text-[13px] font-medium" style={{ color: 'var(--red-800)' }}>
                Reject this proof?
              </p>
              <p className="text-[11px] mt-1" style={{ color: 'var(--red-800)', opacity: 0.75 }}>
                The member will be notified and asked to re-upload.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setAction(null)}
                  className="flex-1 py-[10px] rounded-[10px] border-h text-[13px] font-medium tap-active"
                  style={{ background: 'var(--c-surface)', color: 'var(--c-t2)' }}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-[10px] rounded-[10px] text-[13px] font-medium tap-active"
                  style={{ background: 'var(--red-400)', color: '#fff' }}
                >
                  Confirm reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── APPROVED STATE ── */}
        {action === 'approved' && (
          <div
            className="mx-[14px] mt-4 rounded-[12px] p-5 border-h flex flex-col items-center gap-3 anim-up"
            style={{ background: 'var(--teal-50)' }}
          >
            <div
              className="w-[48px] h-[48px] rounded-full flex items-center justify-center"
              style={{ background: 'var(--teal-400)' }}
            >
              <Check size={22} strokeWidth={2.5} color="#fff" />
            </div>
            <p className="text-[15px] font-medium text-center" style={{ color: 'var(--teal-800)' }}>
              Proof approved
            </p>
            <p className="text-[12px] text-center" style={{ color: 'var(--teal-600)' }}>
              {member.name}'s {bill} payment is confirmed.
            </p>
          </div>
        )}

        <div className="h-5" />
      </div>

      {/* ── BOTTOM NAV ── */}
      <BottomNav active="home" role="manager" />
    </div>
  )
}
