// ─── Current user ──────────────────────────────────────────────────────
export const currentUser = {
  id: 'ahmad',
  name: 'Ahmad Faris',
  initials: 'AF',
  color: 'purple',
}

// ─── House ────────────────────────────────────────────────────────────
export const house = {
  name: 'Taman Desa house',
  shortName: '32 Taman Desa',
  month: 'June 2026',
}

// ─── Members ──────────────────────────────────────────────────────────
export const members = [
  { id: 'ahmad',  name: 'Ahmad',   initials: 'AF', color: 'purple' },
  { id: 'siewli', name: 'Siew Li', initials: 'SL', color: 'teal'   },
  { id: 'raj',    name: 'Raj',     initials: 'RN', color: 'amber'  },
  { id: 'zara',   name: 'Zara',    initials: 'ZO', color: 'gray'   },
]

// ─── Member home: bills ───────────────────────────────────────────────
export const memberBills = [
  {
    id: 'rent',
    name: 'Rent',
    icon: 'Home',
    iconColor: 'purple',
    total: 1000,
    myShare: 250,
    dueDate: '28 Jun',
    status: 'awaiting-review',
    meta: 'Due 28 Jun · proof uploaded',
  },
  {
    id: 'electricity',
    name: 'Electricity',
    icon: 'Zap',
    iconColor: 'amber',
    total: 272,
    myShare: 68,
    dueDate: '28 Jun',
    status: 'pending',
    meta: 'Due 28 Jun · payment needed',
  },
  {
    id: 'internet',
    name: 'Internet',
    icon: 'Wifi',
    iconColor: 'teal',
    total: 180,
    myShare: 45,
    dueDate: '28 Jun',
    status: 'confirmed',
    meta: 'Confirmed · Jun 2026',
  },
  {
    id: 'water',
    name: 'Water',
    icon: 'Droplets',
    iconColor: 'red',
    total: 88,
    myShare: 22,
    dueDate: '28 Jun',
    status: 'overdue',
    meta: '3 days overdue',
  },
]

// ─── Member home: house progress ──────────────────────────────────────
export const memberProgress = [
  { id: 'ahmad',  name: 'Ahmad',   initials: 'AF', color: 'purple', pct: 50,  isSelf: true },
  { id: 'siewli', name: 'Siew Li', initials: 'SL', color: 'teal',   pct: 100 },
  { id: 'raj',    name: 'Raj',     initials: 'RN', color: 'amber',  pct: 25  },
  { id: 'zara',   name: 'Zara',    initials: 'ZO', color: 'gray',   pct: 0   },
]

// ─── Grocery pot ─────────────────────────────────────────────────────
export const groceryPot = {
  balance: 47.50,
  target: 120,
  spent: 72.50,
}

export const memberContributions = [
  { id: 'ahmad',  name: 'Ahmad',   color: 'purple', amount: 30 },
  { id: 'siewli', name: 'Siew Li', color: 'teal',   amount: 40 },
  { id: 'raj',    name: 'Raj',     color: 'amber',  amount: 20 },
  { id: 'zara',   name: 'Zara',    color: 'gray',   amount: 30 },
]

export const groceryActivity = [
  {
    id: 1, type: 'spend',
    icon: 'ShoppingCart', iconColor: 'teal',
    name: 'Grocery run — Econsave',
    who: 'Siew Li', when: 'Today, 11:30 am',
    amount: -38.20,
  },
  {
    id: 2, type: 'topup',
    icon: 'ArrowUp', iconColor: 'teal',
    name: 'Top-up',
    who: 'Raj', when: 'Yesterday',
    amount: 20.00,
  },
  {
    id: 3, type: 'spend',
    icon: 'Package', iconColor: 'amber',
    name: 'Cleaning supplies',
    who: 'Ahmad', when: '1 Jun',
    amount: -14.90,
  },
  {
    id: 4, type: 'topup',
    icon: 'ArrowUp', iconColor: 'teal',
    name: 'Top-up',
    who: 'Zara', when: '1 Jun',
    amount: 30.00,
  },
  {
    id: 5, type: 'topup',
    icon: 'ArrowUp', iconColor: 'teal',
    name: 'Top-up',
    who: 'Ahmad', when: '1 Jun',
    amount: 30.00,
  },
]

// ─── Manager dashboard ────────────────────────────────────────────────
export const managerBills = [
  {
    id: 'rent',
    name: 'Rent',
    icon: 'Home',
    iconColor: 'purple',
    total: 1000,
    memberStatuses: [
      { id: 'ahmad',  initials: 'AF', color: 'purple', status: 'awaiting-review' },
      { id: 'siewli', initials: 'SL', color: 'teal',   status: 'confirmed' },
      { id: 'raj',    initials: 'RN', color: 'amber',  status: 'confirmed' },
      { id: 'zara',   initials: 'ZO', color: 'gray',   status: 'pending' },
    ],
  },
  {
    id: 'electricity',
    name: 'Electricity',
    icon: 'Zap',
    iconColor: 'amber',
    total: 272,
    memberStatuses: [
      { id: 'ahmad',  initials: 'AF', color: 'purple', status: 'pending' },
      { id: 'siewli', initials: 'SL', color: 'teal',   status: 'confirmed' },
      { id: 'raj',    initials: 'RN', color: 'amber',  status: 'awaiting-review' },
      { id: 'zara',   initials: 'ZO', color: 'gray',   status: 'overdue' },
    ],
  },
  {
    id: 'internet',
    name: 'Internet',
    icon: 'Wifi',
    iconColor: 'teal',
    total: 180,
    memberStatuses: [
      { id: 'ahmad',  initials: 'AF', color: 'purple', status: 'confirmed' },
      { id: 'siewli', initials: 'SL', color: 'teal',   status: 'confirmed' },
      { id: 'raj',    initials: 'RN', color: 'amber',  status: 'confirmed' },
      { id: 'zara',   initials: 'ZO', color: 'gray',   status: 'confirmed' },
    ],
  },
  {
    id: 'water',
    name: 'Water',
    icon: 'Droplets',
    iconColor: 'red',
    total: 88,
    memberStatuses: [
      { id: 'ahmad',  initials: 'AF', color: 'purple', status: 'overdue' },
      { id: 'siewli', initials: 'SL', color: 'teal',   status: 'confirmed' },
      { id: 'raj',    initials: 'RN', color: 'amber',  status: 'pending' },
      { id: 'zara',   initials: 'ZO', color: 'gray',   status: 'overdue' },
    ],
  },
]

export const attentionItems = [
  { id: 1, memberId: 'raj',   memberName: 'Raj',   initials: 'RN', color: 'amber',  bill: 'Electricity', status: 'awaiting-review', amount: 68 },
  { id: 2, memberId: 'zara',  memberName: 'Zara',  initials: 'ZO', color: 'gray',   bill: 'Rent',        status: 'overdue',         amount: 250 },
  { id: 3, memberId: 'ahmad', memberName: 'Ahmad', initials: 'AF', color: 'purple', bill: 'Water',       status: 'overdue',         amount: 22 },
]

// ─── Proof review (Raj's electricity upload) ──────────────────────────
export const proofReviewData = {
  member:    { name: 'Raj Kumar', initials: 'RN', color: 'amber' },
  bill:      'Electricity',
  billTotal: 272,
  myShare:   68,
  uploadedAt: '3 Jun, 9:47 am',
  aiCheck:   { passed: false, uploadedAmount: 60.00, expectedAmount: 68.00 },
}
