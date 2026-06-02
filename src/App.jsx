import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import MemberHome      from './screens/MemberHome'
import GroceryPot      from './screens/GroceryPot'
import BillDetail      from './screens/BillDetail'
import ManagerDashboard from './screens/ManagerDashboard'
import ProofReview     from './screens/ProofReview'
import CreateBill      from './screens/CreateBill'

export default function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    /* ── OUTER STAGE ─────────────────────────────────────────────── */
    <div
      className="min-h-[100dvh] flex items-center justify-center"
      style={{ background: 'var(--c-outer)' }}
    >
      {/* ── PHONE FRAME ─────────────────────────────────────────── */}
      <div
        className="relative w-full md:w-[390px]
                   h-[100dvh] md:h-[844px]
                   flex flex-col overflow-hidden
                   rounded-none md:rounded-[48px]
                   md:border-h"
        style={{ background: 'var(--c-bg)' }}
      >
        {/* Notch pill — desktop only */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2
                        w-[120px] h-[36px] rounded-full z-50
                        hidden md:block"
             style={{ background: '#0A0A0A' }} />

        {/* Dark mode toggle — top-right corner */}
        <button
          onClick={() => setDark(d => !d)}
          className="absolute top-[14px] right-[18px] z-50
                     w-[28px] h-[28px] rounded-full
                     flex items-center justify-center
                     tap-active hidden md:flex"
          style={{ background: 'var(--c-surface2)', color: 'var(--c-t2)' }}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark
            ? <Sun size={13} strokeWidth={1.75} />
            : <Moon size={13} strokeWidth={1.75} />
          }
        </button>

        {/* Status bar — desktop only */}
        <div className="hidden md:flex items-end justify-between
                        px-7 pt-[14px] pb-1 h-[52px] shrink-0">
          <span className="text-[15px] font-bold" style={{ color: 'var(--c-t1)' }}>9:41</span>
          <div className="flex items-center gap-[5px]">
            {/* Signal */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0"    y="8" width="3" height="4" rx="1" fill="currentColor" style={{color:'var(--c-t1)'}}/>
              <rect x="4.5"  y="5" width="3" height="7" rx="1" fill="currentColor" style={{color:'var(--c-t1)'}}/>
              <rect x="9"    y="2" width="3" height="10" rx="1" fill="currentColor" style={{color:'var(--c-t1)'}}/>
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" style={{color:'var(--c-t1)', opacity:0.3}}/>
            </svg>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <circle cx="8" cy="11" r="1.3" fill="currentColor" style={{color:'var(--c-t1)'}}/>
              <path d="M4.8 8.2C5.8 7.3 6.9 6.8 8 6.8s2.2.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" style={{color:'var(--c-t1)'}}/>
              <path d="M2 5.2C3.7 3.6 5.7 2.7 8 2.7s4.3.9 6 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" style={{color:'var(--c-t1)', opacity:0.35}}/>
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" style={{color:'var(--c-t1)', opacity:0.35}}/>
              <rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor" style={{color:'var(--c-t1)'}}/>
              <path d="M23 4v4c.9-.5 1.5-1.1 1.5-2S23.9 4.5 23 4z" fill="currentColor" style={{color:'var(--c-t1)', opacity:0.4}}/>
            </svg>
          </div>
        </div>

        {/* ── SCREEN SLOT ──────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/"                  element={<MemberHome />} />
            <Route path="/grocery"           element={<GroceryPot />} />
            <Route path="/bill/:id"          element={<BillDetail />} />
            <Route path="/manager"           element={<ManagerDashboard />} />
            <Route path="/manager/review/:id" element={<ProofReview />} />
            <Route path="/manager/new-bill"  element={<CreateBill />} />
            <Route path="*"                  element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
