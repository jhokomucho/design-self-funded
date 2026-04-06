<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Screen 9 — Manual Reactivation (Ops post-deactivation action)
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOpsStore } from '@/stores/ops'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const store = useOpsStore()
const { employers } = storeToRefs(store)

const employerId = route.params.employerId as string
const employer = computed(() => employers.value.find(e => e.id === employerId))

const reason = ref('')
const confirmed = ref(false)
const submitting = ref(false)

function submit() {
  if (!reason.value.trim()) return
  submitting.value = true
  setTimeout(() => {
    store.reactivateEmployer(employerId)
    submitting.value = false
    confirmed.value = true
  }, 1200)
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(val)
}
</script>

<template>
  <div class="mx-auto max-w-screen-sm px-6 py-8 space-y-6">

    <div>
      <RouterLink to="/ops/employers" class="text-xs text-disabled hover:text-weak">
        ← Back to Employer Overview
      </RouterLink>
      <p class="text-xs text-disabled font-medium uppercase tracking-wide mt-4">Ops Admin</p>
      <h1 class="text-2xl font-semibold text-strong mt-0.5">Manual Reactivation</h1>
    </div>

    <!-- No employer found -->
    <div v-if="!employer" class="rounded-xl border border-weak bg-surface-gray p-6 text-center">
      <p class="text-sm text-weak">Employer not found.</p>
    </div>

    <!-- Success state -->
    <div v-else-if="confirmed" class="space-y-4">
      <div class="rounded-xl border border-green-200 bg-green-50 p-6 text-center space-y-2">
        <div class="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center" aria-hidden="true">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-green-800">ReadyWage reactivated</p>
        <p class="text-xs text-green-700 mt-1">
          {{ employer.companyName }}'s ReadyWage is now active. Balance monitoring has resumed.
        </p>
      </div>
      <button @click="router.push('/ops/employers')" class="w-full px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors">
        Back to Overview
      </button>
    </div>

    <!-- Reactivation form -->
    <template v-else>

      <!-- Employer summary -->
      <div class="rounded-xl border border-red-200 bg-red-50 p-4 space-y-1">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-red-800">{{ employer.companyName }}</p>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 border border-red-200 text-red-700">
            <span class="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
            Deactivated
          </span>
        </div>
        <p class="text-xs text-red-700">
          Current balance: <strong>{{ formatCurrency(employer.balance) }}</strong>
          ({{ Math.round((employer.balance / employer.fundedAmount) * 100) }}% of {{ formatCurrency(employer.fundedAmount) }})
        </p>
        <p class="text-xs text-red-700 font-mono">{{ employer.accountNumber }}</p>
      </div>

      <div class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 space-y-1">
        <p class="font-semibold">Before reactivating</p>
        <p>Confirm with the employer that a top-up transfer has been initiated or confirmed by Netbank. Reactivating without a funded account will trigger immediate re-deactivation.</p>
      </div>

      <!-- Reason field (required audit log) -->
      <form @submit.prevent="submit" class="space-y-4" novalidate>
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-strong" for="reactivation-reason">
            Reason for manual reactivation <span class="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="reactivation-reason"
            v-model="reason"
            rows="3"
            placeholder="e.g. Employer confirmed PESONet transfer of ₱500,000 pending settlement — Netbank ref: REF-2026040212345"
            required
            class="w-full px-3 py-2.5 rounded-lg border border-weak text-sm text-strong bg-surface-white placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
          />
          <p class="text-xs text-disabled">This reason is logged in the audit trail with your identity and timestamp.</p>
        </div>

        <button
          type="submit"
          :disabled="!reason.trim() || submitting"
          class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg v-if="submitting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ submitting ? 'Reactivating...' : 'Confirm Reactivation' }}
        </button>
      </form>

    </template>

  </div>
</template>
