<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Screen 3 — Account Unavailable State
// Design: DI-3 — explicit, no stale data. Name what's unavailable, why, what to do.
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const retrying = ref(false)

function retry() {
  retrying.value = true
  setTimeout(() => {
    retrying.value = false
    router.push('/employer/dashboard')
  }, 2000)
}
</script>

<template>
  <div class="mx-auto max-w-screen-sm px-6 py-16 flex flex-col items-center text-center space-y-6">

    <!-- Icon -->
    <div class="h-14 w-14 rounded-full bg-surface-gray border border-weak flex items-center justify-center" aria-hidden="true">
      <svg class="h-6 w-6 text-disabled" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    </div>

    <!-- Headline -->
    <div class="space-y-2">
      <h1 class="text-xl font-semibold text-strong">Balance unavailable right now</h1>
      <!-- DI-3: brief non-technical reason, no stale data shown -->
      <p class="text-sm text-weak leading-relaxed">
        We're having trouble connecting to your Netbank account. This is a temporary issue — your account and funds are not affected.
      </p>
    </div>

    <!-- What to do -->
    <div class="w-full rounded-xl border border-weak bg-surface-gray p-4 text-left space-y-2">
      <p class="text-xs font-semibold text-disabled uppercase tracking-wide">What you can do</p>
      <ul class="space-y-1.5 text-sm text-weak">
        <li class="flex items-start gap-2">
          <span class="mt-0.5 text-disabled" aria-hidden="true">•</span>
          Try again in a few minutes — the issue usually resolves quickly.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 text-disabled" aria-hidden="true">•</span>
          If ReadyWage is deactivated, employees cannot request advances until balance is confirmed.
        </li>
        <li class="flex items-start gap-2">
          <span class="mt-0.5 text-disabled" aria-hidden="true">•</span>
          Contact Sprout Ops if the issue persists for more than 15 minutes.
        </li>
      </ul>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-3 w-full">
      <button
        @click="retry"
        :disabled="retrying"
        class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 disabled:opacity-60 transition-colors"
        aria-label="Retry loading account balance"
      >
        <svg v-if="retrying" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ retrying ? 'Retrying...' : 'Try again' }}
      </button>
      <a
        href="mailto:ops@sprout.ph"
        class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-weak bg-surface-white text-sm font-medium text-weak hover:bg-surface-gray transition-colors"
      >
        Contact Support
      </a>
    </div>

    <RouterLink to="/employer/dashboard" class="text-xs text-disabled hover:text-weak">
      ← Back to dashboard
    </RouterLink>

  </div>
</template>
