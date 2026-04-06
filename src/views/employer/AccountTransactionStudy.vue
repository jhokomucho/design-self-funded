<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Study — Account + Transactions side-by-side
// Left column: account panel (status, metrics, health gauge, top-up guidance)
// Right column: transaction history (filter, table, pagination)
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEmployerStore } from '@/stores/employer'
import type { Transaction } from '@/stores/employer'
import { storeToRefs } from 'pinia'
import { TogeBadge } from '@/components/ui/toge-badge'
import { TogeAlert, TogeAlertTitle, TogeAlertDescription } from '@/components/ui/toge-alert'

const route = useRoute()
const showWelcomeModal = ref(false)
onMounted(() => {
  if (route.query.welcome === '1') showWelcomeModal.value = true
})

const store = useEmployerStore()
const {
  account,
  transactions,
  isNewAccount,
  balancePercent,
  warningThreshold,
  deactivationThreshold,
  formattedLastUpdated,
} = storeToRefs(store)

// ── Top-up modal ──────────────────────────────────────────────────────────────
const topUpOpen = ref(false)
const copied = ref(false)

function copyAccountNumber() {
  navigator.clipboard.writeText(account.value.accountNumber)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

// ── Status config — Toge v2 tokens only, no raw Tailwind colors ──────────────
const statusConfig = {
  active: {
    label: 'Active',
    badgeTone: 'success' as const,
    color: 'text-success-text',
    bg: 'bg-success-subtle',
    border: 'border-success-subtle',
    dot: 'bg-success',
  },
  warning: {
    label: 'Warning',
    badgeTone: 'warning' as const,
    color: 'text-caution-text',
    bg: 'bg-caution-subtle',
    border: 'border-caution-subtle',
    dot: 'bg-caution',
  },
  deactivated: {
    label: 'Deactivated',
    badgeTone: 'danger' as const,
    color: 'text-danger-text',
    bg: 'bg-danger-subtle',
    border: 'border-danger-subtle',
    dot: 'bg-danger',
  },
}

const currentStatus = computed(() => statusConfig[account.value.status])

const gaugeColor = computed(() => {
  if (balancePercent.value <= 10) return 'bg-danger'
  if (balancePercent.value <= 30) return 'bg-caution'
  return 'bg-success'
})

// ── Transactions ──────────────────────────────────────────────────────────────
const PAGE_SIZE = 20
const currentPage = ref(1)
const dateFrom = ref('2026-03-01')
const dateTo = ref('2026-04-02')

const filtered = computed(() => {
  if (isNewAccount.value) return []
  return transactions.value.filter(t => t.date >= dateFrom.value && t.date <= dateTo.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))

const paginated = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})

const totalDisbursed = computed(() =>
  filtered.value.filter(t => t.type === 'disbursement').reduce((sum, t) => sum + t.amount, 0)
)

function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(val)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Transaction detail panel ──────────────────────────────────────────────────
const selectedTransaction = ref<Transaction | null>(null)

function openPanel(t: Transaction) {
  selectedTransaction.value = t
}

function closePanel() {
  selectedTransaction.value = null
}

// Derive a readable reference number from the id
function txRefNumber(id: string) {
  return `RW-${id.replace('t', '').padStart(6, '0')}`
}

// Next payroll cut-off date (the 25th of this or next month)
function payrollDate(iso: string) {
  const d = new Date(iso)
  const cutoff = new Date(d.getFullYear(), d.getMonth(), 25)
  if (d.getDate() > 25) cutoff.setMonth(cutoff.getMonth() + 1)
  return cutoff.toLocaleDateString('en-PH', { month: 'long', day: 'numeric' })
}

// Mock processing timestamp — deterministic from id seed
function txDateTime(iso: string, id: string) {
  const seed = parseInt(id.replace('t', ''), 10) || 1
  const d = new Date(iso)
  d.setHours(9 + (seed % 8), (seed * 7) % 60)
  return d.toLocaleString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function exportCSV() {
  const header = 'Date,Employee Ref,Description,Status,Amount\n'
  const rows = filtered.value
    .map(t => `${t.date},${t.employeeRef},${t.description},${t.type === 'disbursement' ? 'Settled' : 'Top-up'},${t.amount}`)
    .join('\n')

  const blob = new Blob([header + rows], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `readywage-transactions-${dateFrom.value}-to-${dateTo.value}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div>

    <!-- ── Welcome modal ─────────────────────────────────────────────────── -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showWelcomeModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
      >
        <div class="absolute inset-0 backdrop-blur-sm" style="background-color: rgba(0,0,0,0.75)" @click="showWelcomeModal = false" aria-hidden="true" />

        <div class="relative w-full max-w-lg rounded-2xl bg-surface-white shadow-xl overflow-hidden">

          <!-- Banner image -->
          <div class="relative h-48 overflow-hidden">
            <img src="/asian-sprout.jpg" alt="" aria-hidden="true" class="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-black/10" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div class="absolute bottom-4 left-6 right-6">
              <p class="text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">Self-Funded ReadyWage</p>
              <h2 id="welcome-modal-title" class="text-2xl font-bold text-white leading-tight" style="text-wrap: balance;">
                Welcome to ReadyWage, {{ account.companyName }}!
              </h2>
            </div>
            <button
              @click="showWelcomeModal = false"
              class="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
              aria-label="Close welcome message"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-6 space-y-5">
            <p class="text-sm text-weak leading-relaxed" style="text-wrap: pretty;">
              Your dedicated Netbank advance pool is live. Once your initial deposit settles, your employees can start requesting wage advances — and you'll earn <strong class="text-strong font-semibold">1.5% annual interest</strong> on your float.
            </p>

            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="h-3.5 w-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-strong">Awaiting your first deposit</p>
                  <p class="text-xs text-disabled mt-0.5">Your PESONet transfer will reflect here by the next banking day.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="h-3.5 w-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-strong">Employees can request advances</p>
                  <p class="text-xs text-disabled mt-0.5">Once funded, employees access earned wages instantly through the ReadyWage app.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="h-3.5 w-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-strong">Top up to keep the pool healthy</p>
                  <p class="text-xs text-disabled mt-0.5">You'll be notified when your balance drops below safe thresholds so you can replenish in time.</p>
                </div>
              </div>
            </div>

            <button
              @click="showWelcomeModal = false"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              Got it, let's go
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </Transition>

    <!-- ── Full-width status banner (warning / deactivated only) ─────────── -->
    <Transition name="banner">
      <div v-if="account.status !== 'active'" class="px-6 pt-6">
        <TogeAlert
          :variant="account.status === 'warning' ? 'warning' : 'error'"
          :aria-label="`Account status: ${currentStatus.label}`"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" aria-hidden="true">
            <path v-if="account.status === 'warning'" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <TogeAlertTitle>{{ currentStatus.label }}</TogeAlertTitle>
          <TogeAlertDescription>
            <template v-if="account.status === 'warning'">
              Balance at {{ balancePercent }}% of funded amount. Top up to avoid deactivation.
            </template>
            <template v-else>
              ReadyWage is paused. Employees cannot request advances until you top up.
            </template>
          </TogeAlertDescription>
        </TogeAlert>
      </div>
    </Transition>

    <!-- ── Main content ───────────────────────────────────────────────────── -->
    <div class="mx-auto max-w-screen-xl px-6 py-8">

    <!-- ── Two-column layout: account left · table right ───────────────────── -->
    <div class="grid grid-cols-[320px_1fr] gap-8 items-start">

      <!-- ══ LEFT — Account panel (sticky) ══════════════════════════════════ -->
      <div class="sticky top-8 space-y-4">

        <!-- Page header lives inside left column -->
        <div class="pb-2">
          <svg style="height:28px;width:auto" viewBox="0 0 5844 1292" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ReadyWage" role="img">
            <path d="M1661.63 533.667H1594.36C1559.96 533.667 1531.7 545.34 1509.58 568.685C1487.46 591.416 1476.41 620.598 1476.41 656.23L1476.41 929H1399.92L1399.92 647.936C1399.92 589.573 1417.12 543.804 1451.52 510.629C1485.93 476.84 1532.93 459.946 1592.52 459.946H1661.63V533.667ZM1866.35 940.98C1805.53 940.98 1757.91 923.778 1723.51 889.375C1689.11 854.971 1671.9 807.666 1671.9 747.46V642.407C1671.9 581.586 1689.11 534.282 1723.51 500.493C1757.91 466.089 1805.53 448.887 1866.35 448.887L1894.91 448.887C1955.73 448.887 2003.04 466.089 2036.83 500.493C2071.23 534.282 2088.43 581.586 2088.43 642.407V730.873H1748.39V748.382C1748.39 785.857 1758.83 815.346 1779.72 836.848C1800.61 857.736 1829.48 868.18 1866.35 868.18H1894.91C1923.17 868.18 1946.83 861.729 1965.87 848.828C1984.91 835.926 1998.12 818.725 2005.5 797.222H2084.75C2076.15 842.684 2055.26 878.009 2022.08 903.197C1988.91 928.386 1946.52 940.98 1894.91 940.98H1866.35ZM2012.87 662.68V639.642C2012.87 602.167 2002.42 572.678 1981.54 551.176C1960.65 529.674 1931.77 518.923 1894.91 518.923L1866.35 518.923C1829.48 518.923 1800.61 529.674 1779.72 551.176C1758.83 572.678 1748.39 602.167 1748.39 639.642V662.68H2012.87ZM2305.37 940.98C2252.54 940.98 2211.07 927.464 2180.97 900.433C2151.48 872.787 2136.73 836.848 2136.73 792.615C2136.73 747.767 2151.48 711.828 2180.97 684.797C2211.07 657.151 2252.54 643.328 2305.37 643.328L2467.56 643.328V617.526C2467.56 588.651 2458.04 564.999 2438.99 546.569C2420.56 528.138 2394.45 518.923 2360.66 518.923H2339.47C2309.36 518.923 2284.79 525.988 2265.75 540.118C2246.7 554.248 2234.72 572.986 2229.81 596.331H2152.4C2160.39 548.412 2180.97 511.858 2214.14 486.67C2247.32 461.482 2290.01 448.887 2342.23 448.887H2355.13C2417.18 448.887 2463.87 465.168 2495.2 497.728C2526.54 529.674 2542.2 574.829 2542.2 633.192V802.752C2542.2 824.254 2545.58 839.612 2552.34 848.828C2559.1 857.429 2570.16 861.729 2585.51 861.729H2608.55V929H2569.85C2547.73 929 2529.61 924.392 2515.48 915.177C2501.96 905.348 2492.13 892.139 2485.99 875.552C2473.09 897.054 2455.27 913.334 2432.54 924.392C2410.42 935.451 2385.24 940.98 2356.98 940.98H2305.37ZM2348.68 872.787C2383.7 872.787 2412.27 862.958 2434.38 843.299C2456.5 823.639 2467.56 795.994 2467.56 760.362V709.678L2316.43 709.678C2283.87 709.678 2258.68 717.357 2240.86 732.716C2223.05 747.46 2214.14 766.812 2214.14 790.772C2214.14 814.731 2223.05 834.39 2240.86 849.749C2258.68 865.108 2283.87 872.787 2316.43 872.787H2348.68ZM2814.9 940.98C2754.08 940.98 2706.47 923.778 2672.06 889.375C2637.66 854.971 2620.46 807.666 2620.46 747.46V642.407C2620.46 582.201 2637.05 534.896 2670.22 500.493C2703.4 466.089 2747.94 448.887 2803.84 448.887H2846.23C2897.22 448.887 2936.54 464.553 2964.19 495.885L2963.27 470.082V276.563H3039.75V747.46C3039.75 808.281 3022.86 855.893 2989.07 890.296C2955.89 924.085 2908.28 940.98 2846.23 940.98H2814.9ZM2845.31 866.337C2882.79 866.337 2911.66 855.893 2931.93 835.005C2952.82 813.503 2963.27 783.707 2963.27 745.617V643.328C2963.27 605.853 2952.82 576.365 2931.93 554.862C2911.05 533.36 2882.17 522.609 2845.31 522.609H2815.82C2778.96 522.609 2750.09 533.36 2729.2 554.862C2708.31 576.365 2697.87 605.853 2697.87 643.328V745.617C2697.87 783.092 2708.31 812.581 2729.2 834.083C2750.09 855.585 2778.96 866.337 2815.82 866.337H2845.31ZM3097.69 1047.88L3143.77 1047.88C3171.41 1047.88 3194.14 1039.58 3211.96 1023C3229.78 1007.02 3246.36 982.141 3261.72 948.352L3275.55 919.785L3066.36 459.946H3151.14L3256.19 694.934L3315.17 831.319L3371.38 694.934L3469.99 459.946H3554.77L3352.03 929C3325.62 995.35 3296.74 1043.58 3265.41 1073.68C3234.69 1104.4 3194.76 1119.75 3145.61 1119.75H3097.69V1047.88Z" fill="#092903"/>
            <path d="M3936.51 676.503L3916.23 621.212L3895.96 676.503L3795.51 929H3719.95L3551.31 459.946H3633.33L3721.79 713.364L3759.57 831.319L3877.53 534.589L3846.2 459.946H3926.37L4073.81 831.319L4112.52 712.443L4199.14 459.946H4281.16L4114.36 929H4039.72L3936.51 676.503ZM4449.96 940.98C4397.13 940.98 4355.66 927.464 4325.55 900.433C4296.07 872.787 4281.32 836.848 4281.32 792.615C4281.32 747.767 4296.07 711.828 4325.55 684.797C4355.66 657.151 4397.13 643.328 4449.96 643.328L4612.15 643.328V617.526C4612.15 588.651 4602.63 564.999 4583.58 546.569C4565.15 528.138 4539.04 518.923 4505.25 518.923H4484.06C4453.95 518.923 4429.38 525.988 4410.33 540.118C4391.29 554.248 4379.31 572.986 4374.4 596.331H4296.99C4304.97 548.412 4325.55 511.858 4358.73 486.67C4391.9 461.482 4434.6 448.887 4486.82 448.887H4499.72C4561.77 448.887 4608.46 465.168 4639.79 497.728C4671.13 529.674 4686.79 574.829 4686.79 633.192V802.752C4686.79 824.254 4690.17 839.612 4696.93 848.828C4703.69 857.429 4714.74 861.729 4730.1 861.729H4753.14V929H4714.44C4692.32 929 4674.2 924.392 4660.07 915.177C4646.55 905.348 4636.72 892.139 4630.58 875.552C4617.68 897.054 4599.86 913.334 4577.13 924.392C4555.01 935.451 4529.83 940.98 4501.57 940.98H4449.96ZM4493.27 872.787C4528.29 872.787 4556.86 862.958 4578.97 843.299C4601.09 823.639 4612.15 795.994 4612.15 760.362V709.678L4461.02 709.678C4428.46 709.678 4403.27 717.357 4385.45 732.716C4367.64 747.46 4358.73 766.812 4358.73 790.772C4358.73 814.731 4367.64 834.39 4385.45 849.749C4403.27 865.108 4428.46 872.787 4461.02 872.787H4493.27ZM4903.02 1128.97C4861.24 1128.97 4826.84 1116.38 4799.81 1091.19C4772.78 1066.61 4759.26 1034.67 4759.26 995.35V977.841H4835.75V991.663C4835.75 1010.71 4842.81 1026.68 4856.94 1039.58C4871.69 1052.48 4890.12 1058.93 4912.23 1058.93H5055.07C5078.41 1058.93 5097.15 1052.79 5111.28 1040.5C5125.41 1028.22 5132.48 1012.24 5132.48 992.585C5132.48 972.926 5125.41 956.953 5111.28 944.666C5097.15 932.379 5078.41 926.235 5055.07 926.235H4874.45C4849.26 926.235 4828.68 918.863 4812.71 904.119C4797.35 889.375 4789.67 871.559 4789.67 850.671C4789.67 827.94 4798.58 807.666 4816.39 789.85L4848.65 757.597C4797.04 729.951 4771.24 682.647 4771.24 615.683C4771.24 563.463 4787.52 522.609 4820.08 493.12C4852.64 463.632 4899.95 448.887 4961.99 448.887H5003.46C5054.45 448.887 5095.62 459.024 5126.95 479.298L5185 423.085L5231.08 471.004L5173.94 527.217C5188.07 551.791 5195.14 581.279 5195.14 615.683C5195.14 667.902 5178.86 708.756 5146.3 738.245C5113.74 767.119 5066.13 781.557 5003.46 781.557H4961.99C4947.25 781.557 4932.81 780.635 4918.68 778.792L4886.43 810.124C4879.06 817.496 4875.37 825.175 4875.37 833.162C4875.37 839.92 4877.83 845.449 4882.74 849.749C4887.66 853.435 4894.72 855.278 4903.94 855.278H5066.13C5107.9 855.278 5142 868.18 5168.42 893.982C5195.45 919.785 5208.96 952.652 5208.96 992.585C5208.96 1032.52 5195.45 1065.08 5168.42 1090.27C5142 1116.07 5107.9 1128.97 5066.13 1128.97L4903.02 1128.97ZM5004.38 711.521C5041.86 711.521 5070.12 702.613 5089.16 684.797C5108.82 666.981 5118.65 643.636 5118.65 614.761C5118.65 585.887 5108.82 562.849 5089.16 545.647C5069.51 527.831 5041.25 518.923 5004.38 518.923H4961.99C4924.52 518.923 4895.95 527.831 4876.29 545.647C4857.25 562.849 4847.73 585.887 4847.73 614.761C4847.73 644.25 4857.25 667.902 4876.29 685.718C4895.95 702.92 4924.52 711.521 4961.99 711.521H5004.38ZM5441.42 940.98C5380.6 940.98 5332.98 923.778 5298.58 889.375C5264.18 854.971 5246.97 807.666 5246.97 747.46V642.407C5246.97 581.586 5264.18 534.282 5298.58 500.493C5332.98 466.089 5380.6 448.887 5441.42 448.887H5469.98C5530.8 448.887 5578.11 466.089 5611.9 500.493C5646.3 534.282 5663.5 581.586 5663.5 642.407V730.873H5323.46V748.382C5323.46 785.857 5333.91 815.346 5354.79 836.848C5375.68 857.736 5404.55 868.18 5441.42 868.18H5469.98C5498.24 868.18 5521.9 861.729 5540.94 848.828C5559.98 835.926 5573.19 818.725 5580.57 797.222H5659.82C5651.22 842.684 5630.33 878.009 5597.15 903.197C5563.98 928.386 5521.59 940.98 5469.98 940.98H5441.42ZM5587.94 662.68V639.642C5587.94 602.167 5577.49 572.678 5556.61 551.176C5535.72 529.674 5506.84 518.923 5469.98 518.923H5441.42C5404.55 518.923 5375.68 529.674 5354.79 551.176C5333.91 572.678 5323.46 602.167 5323.46 639.642V662.68H5587.94Z" fill="#32CE13"/>
            <path opacity="0.2" d="M242.5 723.75H367.5V942.5H242.5C234.212 942.5 226.263 939.208 220.403 933.347C214.542 927.487 211.25 919.538 211.25 911.25V755C211.25 746.712 214.542 738.764 220.403 732.903C226.263 727.043 234.212 723.75 242.5 723.75ZM976.875 348.75C960.658 348.76 944.647 352.376 930 359.336C928.936 335.878 920.351 313.385 905.514 295.183C890.677 276.982 870.377 264.039 847.614 258.269C824.852 252.498 800.837 254.207 779.12 263.142C757.404 272.077 739.14 287.764 727.03 307.882C714.919 328.001 709.605 351.483 711.874 374.856C714.142 398.228 723.873 420.25 739.626 437.665C755.379 455.079 776.319 466.961 799.348 471.553C822.376 476.145 846.272 473.204 867.5 463.164C868.487 484.554 875.73 505.184 888.332 522.496C900.934 539.808 918.341 553.04 938.393 560.551C958.445 568.062 980.261 569.522 1001.14 564.749C1022.01 559.977 1041.02 549.183 1055.82 533.704C1070.62 518.226 1080.54 498.745 1084.37 477.678C1088.2 456.61 1085.76 434.882 1077.35 415.188C1068.95 395.494 1054.95 378.701 1037.08 366.891C1019.22 355.081 998.288 348.773 976.875 348.75Z" fill="#2AB410"/>
            <path d="M1079.73 681.016C1068.1 672.069 1054.56 665.923 1040.17 663.058C1025.78 660.192 1010.93 660.683 996.758 664.492L833.32 702.07C837.123 686.008 837.24 669.292 833.664 653.178C830.087 637.063 822.91 621.967 812.67 609.021C802.429 596.075 789.391 585.614 774.533 578.423C759.675 571.233 743.382 567.498 726.875 567.5H531.328C514.906 567.459 498.639 570.672 483.466 576.955C468.293 583.237 454.516 592.464 442.93 604.102L354.57 692.5H242.5C225.924 692.5 210.027 699.085 198.306 710.806C186.585 722.527 180 738.424 180 755V911.25C180 927.826 186.585 943.723 198.306 955.444C210.027 967.165 225.924 973.75 242.5 973.75H648.75C651.305 973.751 653.85 973.436 656.328 972.813L906.328 910.313C907.922 909.933 909.477 909.41 910.977 908.75L1062.81 844.141L1064.53 843.359C1079.12 836.068 1091.62 825.181 1100.84 811.725C1110.06 798.269 1115.71 782.687 1117.25 766.446C1118.78 750.206 1116.16 733.842 1109.62 718.896C1103.08 703.95 1092.85 690.914 1079.88 681.016H1079.73ZM242.5 755H336.25V911.25H242.5V755ZM1037.15 787.07L888.711 850.273L644.844 911.25H398.75V736.68L487.148 648.32C492.931 642.491 499.815 637.87 507.399 634.725C514.984 631.58 523.118 629.974 531.328 630H726.875C739.307 630 751.23 634.939 760.021 643.729C768.811 652.52 773.75 664.443 773.75 676.875C773.75 689.307 768.811 701.23 760.021 710.021C751.23 718.811 739.307 723.75 726.875 723.75H617.5C609.212 723.75 601.263 727.042 595.403 732.903C589.542 738.763 586.25 746.712 586.25 755C586.25 763.288 589.542 771.237 595.403 777.097C601.263 782.958 609.212 786.25 617.5 786.25H742.5C744.852 786.243 747.197 785.981 749.492 785.469L1011.21 725.273L1012.42 724.961C1020.41 722.743 1028.94 723.558 1036.36 727.249C1043.79 730.941 1049.59 737.247 1052.64 744.956C1055.69 752.664 1055.79 761.23 1052.91 769.005C1050.03 776.78 1044.37 783.214 1037.03 787.07H1037.15Z" fill="#2AB410"/>
          </svg>
          <div class="flex items-center gap-2.5 mt-0.5 flex-wrap">
            <h1 class="text-2xl font-semibold text-strong" style="text-wrap: balance">
              {{ account.companyName }}
            </h1>
          </div>
          <p class="text-xs text-disabled mt-1 font-mono">{{ account.accountNumber }}</p>
        </div>

        <!-- Balance card -->
        <div class="rounded-xl border border-weak bg-surface-white p-4">
          <p class="text-xs text-disabled font-medium uppercase tracking-wide">Current Balance</p>
          <p class="text-3xl font-semibold text-strong mt-1.5 tabular-nums">
            {{ formatCurrency(account.balance) }}
          </p>
          <div class="flex items-center justify-between mt-1">
            <p class="text-xs text-disabled">{{ balancePercent }}% of {{ formatCurrency(account.fundedAmount) }} funded</p>
          </div>
        </div>

        <!-- Top Up CTA -->
        <button
          @click="account.status !== 'deactivated' && (topUpOpen = true)"
          :disabled="account.status === 'deactivated'"
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          :class="isNewAccount
            ? 'bg-brand text-white border-brand hover:bg-brand/90'
            : 'bg-surface-white border-weak text-weak hover:bg-surface-hover'"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Top Up Pool
        </button>

        <!-- Interest + Funded side by side -->
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-xl border border-weak bg-surface-white p-4">
            <p class="text-xs text-disabled font-medium uppercase tracking-wide">Interest Earned</p>
            <p class="text-xl font-semibold text-success-text mt-1.5 tabular-nums">
              {{ formatCurrency(account.accruedInterest) }}
            </p>
            <p class="text-xs text-disabled mt-0.5">1.5% p.a.</p>
          </div>
          <div class="rounded-xl border border-weak bg-surface-white p-4">
            <p class="text-xs text-disabled font-medium uppercase tracking-wide">Funded</p>
            <p class="text-xl font-semibold text-strong mt-1.5 tabular-nums">
              {{ formatCurrency(account.fundedAmount) }}
            </p>
            <p class="text-xs text-disabled mt-0.5">Pool size</p>
          </div>
        </div>

        <!-- Balance health gauge -->
        <div class="rounded-xl border border-weak bg-surface-white p-4 space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-strong">Balance Health</p>
            <span class="text-sm font-semibold tabular-nums" :class="currentStatus.color">{{ balancePercent }}%</span>
          </div>
          <div
            class="relative h-2.5 rounded-full bg-surface-gray overflow-hidden"
            role="progressbar"
            :aria-valuenow="balancePercent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`Balance at ${balancePercent}%`"
          >
            <div class="h-full rounded-full transition-all duration-500" :class="gaugeColor" :style="{ width: `${balancePercent}%` }" />
            <div class="absolute top-0 h-full w-px bg-caution/70" style="left: 30%" />
            <div class="absolute top-0 h-full w-px bg-danger/70" style="left: 10%" />
          </div>
          <div class="space-y-1 text-xs text-disabled">
            <span class="flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-danger inline-block" aria-hidden="true" />
              Deactivation at {{ formatCurrency(deactivationThreshold) }} (10%)
            </span>
            <span class="flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-caution inline-block" aria-hidden="true" />
              Warning at {{ formatCurrency(warningThreshold) }} (30%)
            </span>
          </div>
        </div>


      </div>
      <!-- end left column -->

      <!-- ══ RIGHT — Transaction table only ══════════════════════════════════ -->
      <div class="space-y-4 min-w-0">

        <!-- Header — aligned with left column page header -->
        <div class="flex items-start justify-between pb-2">
          <div>
            <h2 class="text-2xl font-semibold text-strong">Transaction History</h2>
            <p class="text-xs text-disabled mt-0.5">{{ filtered.length }} transactions · {{ formatCurrency(totalDisbursed) }} total disbursed</p>
          </div>
          <button
            @click="exportCSV"
            :disabled="account.status === 'deactivated' || filtered.length === 0"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-weak bg-surface-white text-xs font-medium text-weak hover:bg-surface-hover transition-colors mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Export transactions as CSV"
          >
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export CSV
          </button>
        </div>

        <!-- Date filter — single inline pill -->
        <div class="rounded-full border border-weak bg-surface-white px-4 py-2 flex items-center gap-3">
          <label class="text-xs font-medium text-disabled whitespace-nowrap" for="study-date-from">From</label>
          <input id="study-date-from" v-model="dateFrom" type="date"
            class="text-sm text-strong bg-transparent border-none focus:outline-none"
            @change="currentPage = 1" />
          <span class="text-xs text-disabled">To</span>
          <input id="study-date-to" v-model="dateTo" type="date"
            class="text-sm text-strong bg-transparent border-none focus:outline-none"
            @change="currentPage = 1" />
        </div>

        <!-- Table -->
        <div class="rounded-xl border border-weak bg-surface-white overflow-hidden">
          <table class="w-full text-sm" role="table" aria-label="Transaction history">
            <thead>
              <tr class="border-b border-weak bg-surface-gray">
                <th class="text-left px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Date</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Employee Ref</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Description</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Status</th>
                <th class="text-right px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="t in paginated"
                :key="t.id"
                class="border-b border-weak last:border-0 hover:bg-surface-hover transition-colors cursor-pointer select-none"
                :class="selectedTransaction?.id === t.id ? 'bg-surface-gray' : ''"
                @click="openPanel(t)"
                tabindex="0"
                @keydown.enter="openPanel(t)"
                :aria-selected="selectedTransaction?.id === t.id"
              >
                <td class="px-5 py-3.5 text-weak text-xs">{{ formatDate(t.date) }}</td>
                <td class="px-5 py-3.5 font-mono text-xs text-strong">{{ t.employeeRef }}</td>
                <td class="px-5 py-3.5 text-weak text-xs">{{ t.description }}</td>
                <td class="px-5 py-3.5">
                  <TogeBadge
                    :variant="t.type === 'disbursement' ? 'outline' : 'fill'"
                    :tone="t.type === 'disbursement' ? 'success' : 'info'"
                  >
                    {{ t.type === 'disbursement' ? 'Settled' : 'Top-up' }}
                  </TogeBadge>
                </td>
                <td class="px-5 py-3.5 text-right font-semibold tabular-nums text-strong text-xs">
                  {{ formatCurrency(t.amount) }}
                </td>
              </tr>
              <tr v-if="paginated.length === 0">
                <td colspan="5" class="px-5 py-14 text-center">
                  <template v-if="isNewAccount">
                    <div class="flex flex-col items-center gap-3">
                      <div class="h-10 w-10 rounded-full bg-surface-gray flex items-center justify-center" aria-hidden="true">
                        <svg class="h-5 w-5 text-disabled" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-strong">No transactions yet</p>
                        <p class="text-xs text-disabled mt-0.5">Fund your ReadyWage pool to start disbursing advances.</p>
                      </div>
                      <button
                        @click="topUpOpen = true"
                        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand/90 transition-colors mt-1"
                      >
                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Top Up Pool
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <p class="text-sm text-disabled">No transactions found for this date range.</p>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="flex items-center justify-between px-5 py-3 border-t border-weak bg-surface-gray">
            <p class="text-xs text-disabled tabular-nums">Page {{ currentPage }} of {{ totalPages }}</p>
            <div class="flex items-center gap-2">
              <button @click="prevPage" :disabled="currentPage === 1"
                class="px-3 py-1.5 rounded-md text-xs font-medium border border-weak bg-surface-white text-weak hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page">Previous</button>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-3 py-1.5 rounded-md text-xs font-medium border border-weak bg-surface-white text-weak hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page">Next</button>
            </div>
          </div>
        </div>

      </div>
      <!-- end right column -->

    </div>

    </div><!-- end max-w-screen-xl -->
  </div><!-- end root -->

  <!-- ── Backdrop ─────────────────────────────────────────────────────────── -->
  <Transition name="tx-backdrop">
    <div
      v-if="selectedTransaction"
      class="fixed inset-0 z-40" style="background-color: rgba(0,0,0,0.75)"
      aria-hidden="true"
      @click="closePanel"
    />
  </Transition>

  <!-- ── Transaction detail panel ─────────────────────────────────────────── -->
  <Transition name="tx-panel">
    <aside
      v-if="selectedTransaction"
      class="fixed right-0 top-0 bottom-0 z-50 w-[420px] bg-surface-white border-l border-weak shadow-2xl flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Transaction details"
    >
      <!-- Panel header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-weak flex-shrink-0">
        <div>
          <p class="text-xs text-disabled font-medium uppercase tracking-wide">Transaction Details</p>
          <p class="text-sm font-mono font-semibold text-strong mt-0.5">{{ txRefNumber(selectedTransaction.id) }}</p>
        </div>
        <button
          @click="closePanel"
          class="h-8 w-8 rounded-lg flex items-center justify-center text-disabled hover:text-strong hover:bg-surface-gray transition-colors"
          aria-label="Close panel"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Panel body -->
      <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">

        <!-- Amount + status hero -->
        <div class="rounded-xl border border-weak bg-surface-gray p-5">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs text-disabled font-medium uppercase tracking-wide mb-1">Amount</p>
              <p class="text-3xl font-semibold text-strong tabular-nums">
                {{ formatCurrency(selectedTransaction.amount) }}
              </p>
            </div>
            <TogeBadge
              :variant="selectedTransaction.type === 'disbursement' ? 'outline' : 'fill'"
              :tone="selectedTransaction.type === 'disbursement' ? 'success' : 'info'"
            >
              {{ selectedTransaction.type === 'disbursement' ? 'Settled' : 'Top-up' }}
            </TogeBadge>
          </div>
          <p class="text-xs text-disabled mt-3">{{ txDateTime(selectedTransaction.date, selectedTransaction.id) }}</p>
        </div>

        <!-- Transaction details -->
        <div class="space-y-1">
          <p class="text-xs font-semibold text-disabled uppercase tracking-wide mb-3">Details</p>
          <div class="rounded-xl border border-weak bg-surface-white overflow-hidden divide-y divide-weak">
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Employee Ref</span>
              <span class="text-xs font-mono font-semibold text-strong">{{ selectedTransaction.employeeRef }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Description</span>
              <span class="text-xs text-strong">{{ selectedTransaction.description }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Date</span>
              <span class="text-xs text-strong">{{ formatDate(selectedTransaction.date) }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Reference No.</span>
              <span class="text-xs font-mono text-strong">{{ txRefNumber(selectedTransaction.id) }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Type</span>
              <span class="text-xs text-strong capitalize">{{ selectedTransaction.type === 'disbursement' ? 'Wage Advance' : 'Fund Top-up' }}</span>
            </div>
          </div>
        </div>

        <!-- Settlement info (disbursement only) -->
        <div v-if="selectedTransaction.type === 'disbursement'" class="space-y-1">
          <p class="text-xs font-semibold text-disabled uppercase tracking-wide mb-3">Settlement</p>
          <div class="rounded-xl border border-weak bg-surface-white overflow-hidden divide-y divide-weak">
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Disbursed amount</span>
              <span class="text-xs tabular-nums text-strong">{{ formatCurrency(selectedTransaction.amount) }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Channel</span>
              <span class="text-xs text-strong">InstaPay via Netbank</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Advance status</span>
              <TogeBadge
                :tone="selectedTransaction.advanceStatus === 'Pending' ? 'warning' : selectedTransaction.advanceStatus === 'Deducted' ? 'info' : 'success'"
                variant="outline"
              >{{ selectedTransaction.advanceStatus }}</TogeBadge>
            </div>
          </div>
          <p class="text-xs text-disabled px-1 mt-1.5">Funded from your ReadyWage pool. Deducted from employee payroll at next cut-off.</p>
        </div>

        <!-- Payroll Deduction (disbursement only) -->
        <div v-if="selectedTransaction.type === 'disbursement'" class="space-y-1">
          <p class="text-xs font-semibold text-disabled uppercase tracking-wide mb-3">Payroll Deduction</p>
          <div class="rounded-xl border border-weak bg-surface-white overflow-hidden divide-y divide-weak">
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Payroll Date</span>
              <span class="text-xs text-strong font-medium">{{ payrollDate(selectedTransaction.date) }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Deduction Amount</span>
              <span class="text-xs tabular-nums text-strong">{{ formatCurrency(selectedTransaction.amount) }}</span>
            </div>
            <div class="flex justify-between items-center px-4 py-3">
              <span class="text-xs text-disabled">Method</span>
              <span class="text-xs text-strong">Payroll Cut-off Deduction</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Panel footer -->
      <div class="flex-shrink-0 px-6 py-4 border-t border-weak bg-surface-gray">
        <button
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-weak bg-surface-white text-xs font-medium text-weak hover:bg-surface-hover transition-colors"
          aria-label="Download receipt"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Receipt
        </button>
      </div>
    </aside>
  </Transition>

  <!-- ── Top-up modal ─────────────────────────────────────────────────────── -->
  <Transition name="tx-backdrop">
    <div
      v-if="topUpOpen"
      class="fixed inset-0 z-40" style="background-color: rgba(0,0,0,0.75)"
      aria-hidden="true"
      @click="topUpOpen = false"
    />
  </Transition>

  <Transition name="modal-pop">
    <div
      v-if="topUpOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="topup-title"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
    >
      <div class="w-full max-w-md bg-surface-white rounded-2xl border border-weak shadow-2xl pointer-events-auto overflow-hidden">

        <!-- Modal header -->
        <div class="flex items-start justify-between px-6 py-5 border-b border-weak">
          <div>
            <p class="text-xs text-disabled font-medium uppercase tracking-wide">ReadyWage Pool</p>
            <h2 id="topup-title" class="text-base font-semibold text-strong mt-0.5">Top Up Your Advance Pool</h2>
          </div>
          <button
            @click="topUpOpen = false"
            class="h-8 w-8 rounded-lg flex items-center justify-center text-disabled hover:text-strong hover:bg-surface-gray transition-colors flex-shrink-0 mt-0.5"
            aria-label="Close"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal body -->
        <div class="px-6 py-5 space-y-5">

          <!-- Account number -->
          <div class="space-y-1.5">
            <p class="text-xs font-semibold text-disabled uppercase tracking-wide">Deposit to this Netbank account</p>
            <div class="flex items-center gap-3 rounded-xl border border-weak bg-surface-gray px-4 py-3">
              <p class="flex-1 font-mono text-lg font-semibold text-strong tracking-wider">
                {{ account.accountNumber }}
              </p>
              <button
                @click="copyAccountNumber"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-weak bg-surface-white text-xs font-medium transition-colors flex-shrink-0"
                :class="copied ? 'text-success-text border-success-subtle' : 'text-weak hover:bg-surface-hover'"
                :aria-label="copied ? 'Copied' : 'Copy account number'"
              >
                <svg v-if="!copied" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                <svg v-else class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {{ copied ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <p class="text-xs text-disabled px-1">Account name: {{ account.companyName }}</p>
          </div>

          <!-- Instructions -->
          <div class="space-y-2">
            <p class="text-xs font-semibold text-disabled uppercase tracking-wide">How to deposit via PESONet</p>
            <ol class="space-y-3">
              <li class="flex gap-3">
                <span class="h-5 w-5 rounded-full bg-brand/10 text-brand text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <p class="text-sm text-strong">Log in to your company's online banking portal.</p>
              </li>
              <li class="flex gap-3">
                <span class="h-5 w-5 rounded-full bg-brand/10 text-brand text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <p class="text-sm text-strong">Initiate a <span class="font-semibold">PESONet transfer</span> using the Netbank account number above.</p>
              </li>
              <li class="flex gap-3">
                <span class="h-5 w-5 rounded-full bg-brand/10 text-brand text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <p class="text-sm text-strong">Enter the amount you want to add to your ReadyWage pool.</p>
              </li>
              <li class="flex gap-3">
                <span class="h-5 w-5 rounded-full bg-brand/10 text-brand text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <p class="text-sm text-strong">Your balance will update here by the <span class="font-semibold">next business day</span> after settlement.</p>
              </li>
            </ol>
          </div>

          <!-- Settlement note -->
          <div class="rounded-lg bg-surface-gray border border-weak px-4 py-3 flex gap-2.5">
            <svg class="h-4 w-4 text-disabled flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <p class="text-xs text-disabled">PESONet settlements are processed on banking days. Transfers initiated after 3:00 PM will be credited the following banking day.</p>
          </div>

        </div>

        <!-- Modal footer -->
        <div class="px-6 py-4 border-t border-weak bg-surface-gray flex justify-end">
          <button
            @click="topUpOpen = false"
            class="px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  </Transition>

</template>

<style scoped>
/* Banner slide-down */
.banner-enter-active {
  transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.banner-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 1, 0.45);
}
.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

/* Panel slide-in — ease-out on enter (decelerating), ease-in on leave (accelerating) */
.tx-panel-enter-active {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.tx-panel-leave-active {
  transition: transform 0.22s cubic-bezier(0.55, 0, 1, 0.45);
}
.tx-panel-enter-from,
.tx-panel-leave-to {
  transform: translateX(100%);
}

/* Backdrop fade */
.tx-backdrop-enter-active {
  transition: opacity 0.25s ease;
}
.tx-backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.tx-backdrop-enter-from,
.tx-backdrop-leave-to {
  opacity: 0;
}

/* Modal pop */
.modal-pop-enter-active {
  transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.55, 0, 1, 0.45);
}
.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(6px);
}
</style>
