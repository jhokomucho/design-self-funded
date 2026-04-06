<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
import { useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isOps = computed(() => route.path.startsWith('/ops'))

const employerLinks = [
  { to: '/employer/dashboard', label: 'Account' },
  { to: '/employer/transactions', label: 'Transactions' },
  { to: '/employer/study', label: 'Study ↔' },
]
const opsLinks = [
  { to: '/ops/employers', label: 'All Employers' },
  { to: '/ops/configure', label: 'Configure Account' },
]
const emailLinks = [
  { to: '/email/balance-warning', label: 'Warning Email' },
  { to: '/email/deactivation', label: 'Deactivation Email' },
]
</script>

<template>
  <nav class="fixed top-0 inset-x-0 z-50 h-16 border-b border-weak bg-surface-white/90 backdrop-blur-sm">
    <div class="mx-auto max-w-screen-xl h-full flex items-center justify-between px-6">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <span class="text-sm font-semibold text-brand">ReadyWage</span>
        <span class="h-4 w-px bg-neutral-200" />
        <span class="text-xs text-weak">{{ isOps ? 'Ops Admin' : 'Employer Portal' }}</span>
      </div>

      <!-- Nav links -->
      <div class="flex items-center gap-1">
        <!-- Employer links -->
        <RouterLink
          v-for="link in employerLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="route.path === link.to
            ? 'bg-surface-gray text-strong'
            : 'text-weak hover:text-strong hover:bg-surface-gray'"
        >
          {{ link.label }}
        </RouterLink>

        <span class="h-4 w-px bg-neutral-200 mx-2" />

        <!-- Ops links -->
        <RouterLink
          v-for="link in opsLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="route.path === link.to
            ? 'bg-surface-gray text-strong'
            : 'text-weak hover:text-strong hover:bg-surface-gray'"
        >
          {{ link.label }}
        </RouterLink>

        <span class="h-4 w-px bg-neutral-200 mx-2" />

        <!-- Email preview links -->
        <RouterLink
          v-for="link in emailLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors text-disabled hover:text-weak hover:bg-surface-gray"
          :class="route.path === link.to ? 'bg-surface-gray text-weak' : ''"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
