import { defineStore } from 'pinia'
import { ref } from 'vue'

export type OpsEmployerStatus = 'active' | 'warning' | 'deactivated' | 'pending'

export interface OpsEmployer {
  id: string
  companyName: string
  accountNumber: string
  balance: number
  fundedAmount: number
  status: OpsEmployerStatus
  lastChecked: string
  onboardedDate: string
  daysUntilSlaBreech?: number
}

export const useOpsStore = defineStore('ops', () => {
  const employers = ref<OpsEmployer[]>([
    {
      id: 'emp-001',
      companyName: 'TechCorp Philippines',
      accountNumber: '005-0010-00032-2',
      balance: 238000,
      fundedAmount: 800000,
      status: 'warning',
      lastChecked: '2026-04-02T14:47:00',
      onboardedDate: '2026-03-10',
    },
    {
      id: 'emp-002',
      companyName: 'MegaCorp Inc.',
      accountNumber: '005-0010-00041-9',
      balance: 42000,
      fundedAmount: 430000,
      status: 'deactivated',
      lastChecked: '2026-04-02T13:05:00',
      onboardedDate: '2026-03-05',
    },
    {
      id: 'emp-003',
      companyName: 'GlobalLink BPO',
      accountNumber: '005-0010-00055-7',
      balance: 720000,
      fundedAmount: 900000,
      status: 'active',
      lastChecked: '2026-04-02T14:55:00',
      onboardedDate: '2026-03-18',
    },
    {
      id: 'emp-004',
      companyName: 'Sunrise Retail Corp',
      accountNumber: '',
      balance: 0,
      fundedAmount: 0,
      status: 'pending',
      lastChecked: '',
      onboardedDate: '',
      daysUntilSlaBreech: 6,
    },
  ])

  const verificationState = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
  const verifiedAccountNumber = ref('')
  const verificationError = ref('')

  function verifyAccount(accountNumber: string) {
    verificationState.value = 'loading'
    verifiedAccountNumber.value = accountNumber

    // Simulate async verification
    setTimeout(() => {
      if (accountNumber === '000-0000-00000-0') {
        verificationState.value = 'error'
        verificationError.value = 'Account not found — please check the number'
      } else if (accountNumber.length >= 15) {
        verificationState.value = 'success'
        verificationError.value = ''
      } else {
        verificationState.value = 'error'
        verificationError.value = 'Invalid account number format'
      }
    }, 1200)
  }

  function reactivateEmployer(employerId: string) {
    const emp = employers.value.find(e => e.id === employerId)
    if (emp) {
      emp.status = 'active'
      emp.balance = emp.fundedAmount * 0.45
      emp.lastChecked = new Date().toISOString()
    }
  }

  function resetVerification() {
    verificationState.value = 'idle'
    verifiedAccountNumber.value = ''
    verificationError.value = ''
  }

  return {
    employers,
    verificationState,
    verifiedAccountNumber,
    verificationError,
    verifyAccount,
    reactivateEmployer,
    resetVerification,
  }
})
