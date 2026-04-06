<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Screen 7 — Source Fund Configuration (Ops)
// Design: DI-5 — inline real-time account verification on field blur
import { ref } from 'vue'
import { useOpsStore } from '@/stores/ops'
import { storeToRefs } from 'pinia'

const store = useOpsStore()
const { verificationState, verificationError } = storeToRefs(store)

const companyName = ref('')
const accountNumber = ref('')
const fundedAmount = ref('')
const activating = ref(false)
const activated = ref(false)

// DI-5: verify on blur, not on submit
function onAccountBlur() {
  if (accountNumber.value.length >= 10) {
    store.verifyAccount(accountNumber.value)
  } else {
    store.resetVerification()
  }
}

function activate() {
  if (verificationState.value !== 'success') return
  activating.value = true
  setTimeout(() => {
    activating.value = false
    activated.value = true
  }, 1500)
}

function reset() {
  activated.value = false
  companyName.value = ''
  accountNumber.value = ''
  fundedAmount.value = ''
  store.resetVerification()
}
</script>

<template>
  <div class="mx-auto max-w-screen-sm px-6 py-8 space-y-6">

    <div>
      <p class="text-xs text-disabled font-medium uppercase tracking-wide">Ops Admin</p>
      <h1 class="text-2xl font-semibold text-strong mt-0.5">Configure Source Fund</h1>
      <p class="text-sm text-weak mt-1">Link a Netbank corporate account to an employer's ReadyWage profile.</p>
    </div>

    <!-- Success state -->
    <div v-if="activated" class="rounded-xl border border-success-subtle bg-success-subtle p-6 text-center space-y-3">
      <div class="mx-auto h-12 w-12 rounded-full bg-success/10 flex items-center justify-center" aria-hidden="true">
        <svg class="h-6 w-6 text-success-text" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <div>
        <p class="text-sm font-semibold text-success-text">Source fund activated</p>
        <p class="text-xs text-success-text mt-1">
          {{ companyName || 'Employer' }} is now on the self-funded ReadyWage model.
          Balance monitoring is active.
        </p>
      </div>
      <button @click="reset" class="text-xs text-success-text underline hover:opacity-80">
        Configure another employer
      </button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="activate" class="space-y-5" novalidate>

      <!-- Company name -->
      <div class="space-y-1.5">
        <label class="text-sm font-medium text-strong" for="company-name">
          Company name
        </label>
        <input
          id="company-name"
          v-model="companyName"
          type="text"
          placeholder="e.g. TechCorp Philippines"
          required
          class="w-full px-3 py-2.5 rounded-lg border border-weak text-sm text-strong bg-surface-white placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
        />
      </div>

      <!-- Account number with inline verification (DI-5) -->
      <div class="space-y-1.5">
        <label class="text-sm font-medium text-strong" for="account-number">
          Netbank account number
        </label>
        <div class="relative">
          <input
            id="account-number"
            v-model="accountNumber"
            type="text"
            placeholder="e.g. 005-0010-00032-2"
            @blur="onAccountBlur"
            required
            class="w-full px-3 py-2.5 rounded-lg border text-sm text-strong bg-surface-white placeholder:text-disabled focus:outline-none focus:ring-2 transition-colors"
            :class="{
              'border-weak focus:ring-brand/30 focus:border-brand': verificationState === 'idle',
              'border-weak focus:ring-brand/30': verificationState === 'loading',
              'border-success focus:ring-success/20': verificationState === 'success',
              'border-danger focus:ring-danger/20': verificationState === 'error',
            }"
          />
          <!-- Inline verification feedback (DI-5) -->
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
            <svg v-if="verificationState === 'loading'" class="h-4 w-4 text-disabled animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <svg v-else-if="verificationState === 'success'" class="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-label="Account verified">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <svg v-else-if="verificationState === 'error'" class="h-4 w-4 text-danger" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-label="Account not found">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <!-- Inline status message -->
        <p v-if="verificationState === 'loading'" class="text-xs text-disabled flex items-center gap-1">
          Verifying account...
        </p>
        <p v-else-if="verificationState === 'success'" class="text-xs text-success-text font-medium flex items-center gap-1">
          ✓ Account verified — Active
        </p>
        <p v-else-if="verificationState === 'error'" class="text-xs text-danger-text font-medium">
          {{ verificationError }}
        </p>
        <p v-else class="text-xs text-disabled">
          Account will be verified against Netbank on blur. Use 000-0000-00000-0 to test error state.
        </p>
      </div>

      <!-- Funded amount -->
      <div class="space-y-1.5">
        <label class="text-sm font-medium text-strong" for="funded-amount">
          Initial funded amount (₱)
        </label>
        <input
          id="funded-amount"
          v-model="fundedAmount"
          type="number"
          placeholder="e.g. 800000"
          required
          class="w-full px-3 py-2.5 rounded-lg border border-weak text-sm text-strong bg-surface-white placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
        />
        <p class="text-xs text-disabled">
          This is used to calculate 30% warning and 10% deactivation thresholds.
        </p>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="verificationState !== 'success' || !companyName || !fundedAmount || activating"
        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <svg v-if="activating" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        {{ activating ? 'Activating...' : 'Activate Source Fund' }}
      </button>

      <p v-if="verificationState !== 'success'" class="text-xs text-center text-disabled">
        Account must be verified before activating
      </p>

    </form>

  </div>
</template>
