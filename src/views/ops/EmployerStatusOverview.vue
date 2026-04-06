<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Screen 8 — Employer Status Overview (Ops cohort health view)
import { useOpsStore } from '@/stores/ops'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const store = useOpsStore()
const { employers } = storeToRefs(store)
const router = useRouter()

const statusConfig = {
  active:      { label: 'Active',      color: 'text-success-text',  bg: 'bg-success-subtle',  border: 'border-success-subtle',  dot: 'bg-success'  },
  warning:     { label: 'Warning',     color: 'text-caution-text',  bg: 'bg-caution-subtle',  border: 'border-caution-subtle',  dot: 'bg-caution'  },
  deactivated: { label: 'Deactivated', color: 'text-danger-text',   bg: 'bg-danger-subtle',   border: 'border-danger-subtle',   dot: 'bg-danger'   },
  pending:     { label: 'Pending',     color: 'text-weak', bg: 'bg-surface-gray', border: 'border-weak', dot: 'bg-neutral-400' },
}

function formatCurrency(val: number) {
  if (!val) return '—'
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(val)
}

function formatPercent(balance: number, funded: number) {
  if (!funded) return '—'
  return `${Math.round((balance / funded) * 100)}%`
}

function formatLastChecked(ts: string) {
  if (!ts) return '—'
  const d = new Date(ts)
  return d.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }) +
    ' · ' + d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })
}

function goToReactivate(id: string) {
  router.push(`/ops/reactivate/${id}`)
}
</script>

<template>
  <div class="mx-auto max-w-screen-xl px-6 py-8 space-y-6">

    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs text-disabled font-medium uppercase tracking-wide">Ops Admin</p>
        <h1 class="text-2xl font-semibold text-strong mt-0.5">Employer Overview</h1>
      </div>
      <RouterLink
        to="/ops/configure"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
      >
        + Configure Account
      </RouterLink>
    </div>

    <!-- Summary strip -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="rounded-lg border border-success-subtle bg-success-subtle p-3 text-center">
        <p class="text-2xl font-semibold text-success-text">{{ employers.filter(e => e.status === 'active').length }}</p>
        <p class="text-xs text-success-text mt-0.5 flex items-center justify-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" /> Active
        </p>
      </div>
      <div class="rounded-lg border border-caution-subtle bg-caution-subtle p-3 text-center">
        <p class="text-2xl font-semibold text-caution-text">{{ employers.filter(e => e.status === 'warning').length }}</p>
        <p class="text-xs text-caution-text mt-0.5 flex items-center justify-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full bg-caution" aria-hidden="true" /> Warning
        </p>
      </div>
      <div class="rounded-lg border border-danger-subtle bg-danger-subtle p-3 text-center">
        <p class="text-2xl font-semibold text-danger-text">{{ employers.filter(e => e.status === 'deactivated').length }}</p>
        <p class="text-xs text-danger-text mt-0.5 flex items-center justify-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full bg-danger" aria-hidden="true" /> Deactivated
        </p>
      </div>
      <div class="rounded-lg border border-weak bg-surface-gray p-3 text-center">
        <p class="text-2xl font-semibold text-weak">{{ employers.filter(e => e.status === 'pending').length }}</p>
        <p class="text-xs text-disabled mt-0.5 flex items-center justify-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full bg-neutral-400" aria-hidden="true" /> Pending
        </p>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-xl border border-weak bg-surface-white overflow-hidden">
      <table class="w-full text-sm" role="table" aria-label="Employer account status overview">
        <thead>
          <tr class="border-b border-weak bg-surface-gray">
            <th class="text-left px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Company</th>
            <th class="text-left px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Status</th>
            <th class="text-right px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Balance</th>
            <th class="text-right px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Health</th>
            <th class="text-right px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Last Checked</th>
            <th class="text-right px-5 py-3 text-xs font-semibold text-disabled uppercase tracking-wide" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="emp in employers"
            :key="emp.id"
            class="border-b border-weak last:border-0 hover:bg-surface-gray transition-colors"
          >
            <td class="px-5 py-4">
              <p class="font-medium text-strong">{{ emp.companyName }}</p>
              <p v-if="emp.accountNumber" class="text-xs text-disabled font-mono mt-0.5">{{ emp.accountNumber }}</p>
              <p v-else class="text-xs text-disabled mt-0.5">
                Account not configured
                <span v-if="emp.daysUntilSlaBreech" class="text-caution-text font-medium">
                  — {{ emp.daysUntilSlaBreech }}d until SLA breach
                </span>
              </p>
            </td>
            <td class="px-5 py-4">
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                :class="[statusConfig[emp.status].bg, statusConfig[emp.status].border, statusConfig[emp.status].color]"
                :aria-label="`Status: ${statusConfig[emp.status].label}`"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="statusConfig[emp.status].dot" aria-hidden="true" />
                {{ statusConfig[emp.status].label }}
              </span>
            </td>
            <td class="px-5 py-4 text-right tabular-nums">
              <p class="font-semibold text-strong">{{ formatCurrency(emp.balance) }}</p>
              <p class="text-xs text-disabled mt-0.5">of {{ formatCurrency(emp.fundedAmount) }}</p>
            </td>
            <td class="px-5 py-4 text-right">
              <span
                class="text-sm font-semibold tabular-nums"
                :class="{
                  'text-success-text': emp.fundedAmount && (emp.balance / emp.fundedAmount) > 0.30,
                  'text-caution-text': emp.fundedAmount && (emp.balance / emp.fundedAmount) <= 0.30 && (emp.balance / emp.fundedAmount) > 0.10,
                  'text-danger-text':  emp.fundedAmount && (emp.balance / emp.fundedAmount) <= 0.10,
                  'text-disabled': !emp.fundedAmount,
                }"
              >
                {{ formatPercent(emp.balance, emp.fundedAmount) }}
              </span>
            </td>
            <td class="px-5 py-4 text-right text-xs text-disabled tabular-nums">
              {{ formatLastChecked(emp.lastChecked) }}
            </td>
            <td class="px-5 py-4 text-right">
              <button
                v-if="emp.status === 'deactivated'"
                @click="goToReactivate(emp.id)"
                class="px-3 py-1.5 rounded-md text-xs font-medium bg-brand/10 text-brand hover:bg-brand/20 transition-colors"
              >
                Reactivate
              </button>
              <button
                v-else-if="emp.status === 'pending'"
                @click="$router.push('/ops/configure')"
                class="px-3 py-1.5 rounded-md text-xs font-medium border border-weak text-weak hover:bg-surface-gray transition-colors"
              >
                Configure
              </button>
              <span v-else class="text-xs text-disabled">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
