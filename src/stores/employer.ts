import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type AccountStatus = 'active' | 'warning' | 'deactivated'

export interface Transaction {
  id: string
  date: string
  amount: number
  employeeRef: string
  description: string
  type: 'disbursement' | 'top_up'
  advanceStatus?: 'Paid' | 'Deducted' | 'Success' | 'Pending'
}

export interface EmployerAccount {
  companyName: string
  accountNumber: string
  balance: number
  fundedAmount: number
  accruedInterest: number
  status: AccountStatus
  lastUpdated: string
}

export const useEmployerStore = defineStore('employer', () => {
  // ── Mock Data ────────────────────────────────────────────────────────
  const account = ref<EmployerAccount>({
    companyName: 'TechCorp Philippines',
    accountNumber: '005-0010-00032-2',
    balance: 238000,
    fundedAmount: 800000,
    accruedInterest: 15400,
    status: 'warning',
    lastUpdated: new Date().toISOString(),
  })

  const transactions = ref<Transaction[]>([
    { id: 't001', date: '2026-04-02', amount: 5000,   employeeRef: 'EMP-0142', description: 'EWA Disbursement — EMP-0142', type: 'disbursement', advanceStatus: 'Success'  },
    { id: 't002', date: '2026-04-02', amount: 8500,   employeeRef: 'EMP-0089', description: 'EWA Disbursement — EMP-0089', type: 'disbursement', advanceStatus: 'Pending'  },
    { id: 't003', date: '2026-04-01', amount: 12000,  employeeRef: 'EMP-0213', description: 'EWA Disbursement — EMP-0213', type: 'disbursement', advanceStatus: 'Deducted' },
    { id: 't004', date: '2026-04-01', amount: 3500,   employeeRef: 'EMP-0057', description: 'EWA Disbursement — EMP-0057', type: 'disbursement', advanceStatus: 'Deducted' },
    { id: 't005', date: '2026-03-31', amount: 7000,   employeeRef: 'EMP-0198', description: 'EWA Disbursement — EMP-0198', type: 'disbursement', advanceStatus: 'Paid'     },
    { id: 't006', date: '2026-03-31', amount: 9200,   employeeRef: 'EMP-0031', description: 'EWA Disbursement — EMP-0031', type: 'disbursement', advanceStatus: 'Paid'     },
    { id: 't007', date: '2026-03-30', amount: 200000, employeeRef: '—',        description: 'Fund Transfer Credit',         type: 'top_up' },
    { id: 't008', date: '2026-03-30', amount: 4800,   employeeRef: 'EMP-0077', description: 'EWA Disbursement — EMP-0077', type: 'disbursement', advanceStatus: 'Paid'     },
    { id: 't009', date: '2026-03-30', amount: 15000,  employeeRef: 'EMP-0004', description: 'EWA Disbursement — EMP-0004', type: 'disbursement', advanceStatus: 'Paid'     },
    { id: 't010', date: '2026-03-29', amount: 6500,   employeeRef: 'EMP-0156', description: 'EWA Disbursement — EMP-0156', type: 'disbursement', advanceStatus: 'Paid'     },
    { id: 't011', date: '2026-03-28', amount: 11000,  employeeRef: 'EMP-0092', description: 'EWA Disbursement — EMP-0092', type: 'disbursement', advanceStatus: 'Paid'     },
    { id: 't012', date: '2026-03-15', amount: 500000, employeeRef: '—',        description: 'Fund Transfer Credit',         type: 'top_up' },
  ])

  const isApiDown = ref(false)
  const isNewAccount = ref(false)

  // ── Computed ─────────────────────────────────────────────────────────
  const balancePercent = computed(() =>
    Math.round((account.value.balance / account.value.fundedAmount) * 100)
  )

  const warningThreshold = computed(() =>
    Math.round(account.value.fundedAmount * 0.30)
  )

  const deactivationThreshold = computed(() =>
    Math.round(account.value.fundedAmount * 0.10)
  )

  const suggestedTopUp = computed(() => {
    const healthy = Math.round(account.value.fundedAmount * 0.80)
    return Math.max(0, healthy - account.value.balance)
  })

  const formattedLastUpdated = computed(() => {
    const d = new Date(account.value.lastUpdated)
    return d.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })
  })

  // ── Actions ──────────────────────────────────────────────────────────
  function setStatus(status: AccountStatus) {
    account.value.status = status
    account.value.fundedAmount = 800000
    if (status === 'active') account.value.balance = 640000
    if (status === 'warning') account.value.balance = 238000
    if (status === 'deactivated') {
      account.value.balance = 60000
      account.value.accruedInterest = 15400
      isNewAccount.value = false
    }
    account.value.lastUpdated = new Date().toISOString()
  }

  function setApiDown(down: boolean) {
    isApiDown.value = down
  }

  function setNewAccount(isNew: boolean) {
    isNewAccount.value = isNew
    if (isNew) {
      account.value.balance = 0
      account.value.fundedAmount = 0
      account.value.status = 'active'
      account.value.accruedInterest = 0
      account.value.lastUpdated = new Date().toISOString()
    } else {
      setStatus('warning')
    }
  }

  function setWithData() {
    isNewAccount.value = false
    account.value.balance = 640000
    account.value.fundedAmount = 800000
    account.value.accruedInterest = 15400
    account.value.status = 'active'
    account.value.lastUpdated = new Date().toISOString()
  }

  return {
    account,
    transactions,
    isApiDown,
    isNewAccount,
    balancePercent,
    warningThreshold,
    deactivationThreshold,
    suggestedTopUp,
    formattedLastUpdated,
    setStatus,
    setApiDown,
    setNewAccount,
    setWithData,
  }
})
