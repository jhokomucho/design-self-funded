<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Screen 4 — New Account Empty State (first-use orientation)
// Design: DI-4 — confirm active, explain what will appear, set expectations
import { useEmployerStore } from '@/stores/employer'

const store = useEmployerStore()
const account = store.account
</script>

<template>
  <div class="mx-auto max-w-screen-sm px-6 py-16 space-y-8">

    <!-- Account confirmed active (top of page, reassuring) -->
    <div class="rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3">
      <span class="h-2.5 w-2.5 rounded-full bg-green-500 flex-shrink-0" aria-hidden="true" />
      <div>
        <p class="text-sm font-semibold text-green-800">Account active</p>
        <p class="text-xs text-green-700 mt-0.5">
          Your ReadyWage advance pool is set up and ready. Account {{ account.accountNumber }} is verified.
        </p>
      </div>
    </div>

    <!-- Balance card — shows funded amount even if no transactions yet -->
    <div class="rounded-xl border border-weak bg-surface-white p-5">
      <p class="text-xs text-disabled font-medium uppercase tracking-wide">Current Balance</p>
      <p class="text-3xl font-semibold text-strong mt-2 tabular-nums">₱800,000</p>
      <p class="text-xs text-disabled mt-1">100% of ₱800,000 funded</p>
      <div class="mt-3 h-2 rounded-full bg-green-100">
        <div class="h-full w-full rounded-full bg-green-500" />
      </div>
      <p class="text-xs text-disabled mt-2">
        Interest is accruing at 1.5% per annum. Check back regularly to see your earnings.
      </p>
    </div>

    <!-- Empty transaction state — DI-4: educational, not an error -->
    <div class="rounded-xl border border-weak bg-surface-white p-6 text-center space-y-3">
      <!-- Illustration placeholder -->
      <div class="mx-auto h-12 w-12 rounded-full bg-surface-gray flex items-center justify-center" aria-hidden="true">
        <svg class="h-5 w-5 text-disabled" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      </div>

      <div>
        <p class="text-sm font-semibold text-strong">No transactions yet</p>
        <p class="text-sm text-weak mt-1 leading-relaxed">
          Employee advance disbursements will appear here once ReadyWage is in use.
          Each transaction shows the date, amount, and employee reference.
        </p>
      </div>

      <p class="text-xs text-disabled">
        Your account is fully set up. Share the ReadyWage app with your employees to get started.
      </p>
    </div>

    <!-- What happens next -->
    <div class="space-y-2">
      <p class="text-xs font-semibold text-disabled uppercase tracking-wide">What to expect</p>
      <div class="space-y-2">
        <div class="flex items-start gap-3 rounded-lg border border-weak bg-surface-white p-3">
          <span class="mt-0.5 text-xs font-semibold text-brand bg-brand/10 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">1</span>
          <p class="text-sm text-weak">Employees request advances via the ReadyWage mobile app</p>
        </div>
        <div class="flex items-start gap-3 rounded-lg border border-weak bg-surface-white p-3">
          <span class="mt-0.5 text-xs font-semibold text-brand bg-brand/10 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">2</span>
          <p class="text-sm text-weak">Funds are disbursed from your Netbank account via InstaPay in real time</p>
        </div>
        <div class="flex items-start gap-3 rounded-lg border border-weak bg-surface-white p-3">
          <span class="mt-0.5 text-xs font-semibold text-brand bg-brand/10 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">3</span>
          <p class="text-sm text-weak">You'll receive an email alert when your balance drops to 30% — that's your signal to top up</p>
        </div>
      </div>
    </div>

    <RouterLink to="/employer/dashboard" class="text-sm text-brand hover:underline">
      ← Back to Account Dashboard
    </RouterLink>

  </div>
</template>
