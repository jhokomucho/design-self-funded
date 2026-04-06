<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
import { useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useEmployerStore } from '@/stores/employer'

const store = useEmployerStore()
import {
  TogeSidebar,
  TogeSidebarContent,
  TogeSidebarFooter,
  TogeSidebarGroup,
  TogeSidebarGroupContent,
  TogeSidebarGroupLabel,
  TogeSidebarHeader,
  TogeSidebarMenu,
  TogeSidebarMenuButton,
  TogeSidebarMenuItem,
  TogeSidebarSeparator,
  TogeSidebarTrigger,
} from '@/components/ui/toge-sidebar'

const route = useRoute()

function isActive(path: string) {
  return route.path === path
}

const portalLabel = computed(() => {
  if (route.path.startsWith('/ops')) return 'Ops Admin'
  if (route.path.startsWith('/email')) return 'Email Previews'
  return 'Employer Portal'
})

const employerLinks = [
  {
    to: '/employer/request-self-funded',
    label: 'Request Self-Funded',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />`,
  },
  {
    to: '/employer/first-login',
    label: 'First Login',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />`,
  },
  {
    to: '/employer/dashboard',
    label: 'Dashboard',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />`,
  },
]

const opsLinks = [
  {
    to: '/ops/employers',
    label: 'All Employers',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" />`,
  },
  {
    to: '/ops/configure',
    label: 'Configure Account',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />`,
  },
]

const emailLinks = [
  {
    to: '/email/balance-warning',
    label: 'Warning Email',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />`,
  },
  {
    to: '/email/deactivation',
    label: 'Deactivation Email',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />`,
  },
]
</script>

<template>
  <!--
    Override --sidebar-accent to brand-subtle so that the built-in
    data-[active=true]:bg-sidebar-accent / text-sidebar-accent-foreground
    states use our brand green tokens instead of the default gray-green.
  -->
  <TogeSidebar
    collapsible="icon"
    class="border-r-0"
    :style="{
      '--sidebar': 'var(--surface-white)',
      '--sidebar-border': 'var(--border-weak)',
      '--sidebar-accent': 'var(--brand-subtle)',
      '--sidebar-accent-foreground': 'var(--brand-text)',
    }"
  >

    <!-- ── Header: logo + collapse trigger ──────────────────────────────── -->
    <TogeSidebarHeader class="border-b border-sidebar-border px-0 py-0">
      <div class="flex items-center gap-2.5 px-3 h-14 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">

        <!-- Brand mark — hidden when collapsed so trigger takes center stage -->
        <div
          class="h-8 w-8 rounded-lg bg-brand flex items-center justify-center flex-shrink-0 group-data-[collapsible=icon]:hidden"
          aria-hidden="true"
        >
          <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        </div>

        <!-- Wordmark — hidden when collapsed -->
        <div class="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
          <p class="text-sm font-semibold text-strong leading-tight">ReadyWage</p>
          <p class="text-[10px] text-disabled leading-tight mt-0.5">{{ portalLabel }}</p>
        </div>

        <!-- Trigger — always visible; acts as expand button when collapsed -->
        <TogeSidebarTrigger
          class="flex-shrink-0 text-disabled hover:text-strong"
        />
      </div>
    </TogeSidebarHeader>

    <!-- ── Nav items ─────────────────────────────────────────────────────── -->
    <TogeSidebarContent>

      <!-- Employer -->
      <TogeSidebarGroup>
        <TogeSidebarGroupLabel class="text-[10px] font-semibold text-disabled uppercase tracking-wider px-2">
          Employer
        </TogeSidebarGroupLabel>
        <TogeSidebarGroupContent>
          <TogeSidebarMenu>
            <template v-for="link in employerLinks" :key="link.to">
              <TogeSidebarMenuItem>
                <TogeSidebarMenuButton
                  as-child
                  :is-active="isActive(link.to)"
                  class="rounded-lg font-medium text-base data-[active=true]:text-brand-text"
                >
                  <RouterLink :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined">
                    <svg
                      class="h-4 w-4 flex-shrink-0"
                      :class="isActive(link.to) ? 'text-brand' : 'text-weak'"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.75"
                      stroke="currentColor"
                      aria-hidden="true"
                      v-html="link.icon"
                    />
                    <span>{{ link.label }}</span>
                  </RouterLink>
                </TogeSidebarMenuButton>
              </TogeSidebarMenuItem>

              <!-- Prototype controls — shown as sub-items under Dashboard -->
              <TogeSidebarMenuItem v-if="link.to === '/employer/dashboard' && isActive('/employer/dashboard')">
                <div class="pl-6 pr-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden">
                  <p class="text-[9px] font-semibold text-disabled uppercase tracking-widest px-1">Prototype Controls</p>

                  <!-- Account -->
                  <div class="space-y-1">
                    <p class="text-[9px] font-semibold text-disabled uppercase tracking-widest px-1">Account</p>
                    <div class="flex flex-wrap gap-1.5">
                      <button @click="store.setNewAccount(true)"
                        class="px-2 py-0.5 rounded text-[10px] font-medium bg-surface-gray border border-weak text-weak hover:bg-surface-hover transition-colors">
                        New Account
                      </button>
                      <button @click="store.setStatus('active')"
                        class="px-2 py-0.5 rounded text-[10px] font-medium bg-success-subtle text-success-text hover:bg-success-subtle-hover transition-colors">
                        Active
                      </button>
                      <button @click="store.setStatus('warning')"
                        class="px-2 py-0.5 rounded text-[10px] font-medium bg-caution-subtle text-caution-text hover:bg-caution-subtle-hover transition-colors">
                        Warning
                      </button>
                      <button @click="store.setStatus('deactivated')"
                        class="px-2 py-0.5 rounded text-[10px] font-medium bg-danger-subtle text-danger-text hover:bg-danger-subtle-hover transition-colors">
                        Deactivated
                      </button>
                    </div>
                  </div>

                  <!-- Data -->
                  <div class="space-y-1">
                    <p class="text-[9px] font-semibold text-disabled uppercase tracking-widest px-1">Data</p>
                    <div class="flex flex-wrap gap-1.5">
                      <button @click="store.setWithData()"
                        class="px-2 py-0.5 rounded text-[10px] font-medium border text-brand hover:opacity-80 transition-opacity"
                        style="background-color: color-mix(in srgb, var(--brand) 10%, transparent); border-color: color-mix(in srgb, var(--brand) 20%, transparent)">
                        w/ Data
                      </button>
                    </div>
                  </div>
                </div>
              </TogeSidebarMenuItem>
            </template>
          </TogeSidebarMenu>
        </TogeSidebarGroupContent>
      </TogeSidebarGroup>

      <TogeSidebarSeparator />

      <!-- Ops Admin -->
      <TogeSidebarGroup>
        <TogeSidebarGroupLabel class="text-[10px] font-semibold text-disabled uppercase tracking-wider px-2">
          Ops Admin
        </TogeSidebarGroupLabel>
        <TogeSidebarGroupContent>
          <TogeSidebarMenu>
            <TogeSidebarMenuItem v-for="link in opsLinks" :key="link.to">
              <TogeSidebarMenuButton
                as-child
                :is-active="isActive(link.to)"
                class="rounded-lg font-medium text-base data-[active=true]:text-brand-text"
              >
                <RouterLink :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined">
                  <svg
                    class="h-4 w-4 flex-shrink-0"
                    :class="isActive(link.to) ? 'text-brand' : 'text-weak'"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.75"
                    stroke="currentColor"
                    aria-hidden="true"
                    v-html="link.icon"
                  />
                  <span>{{ link.label }}</span>
                </RouterLink>
              </TogeSidebarMenuButton>
            </TogeSidebarMenuItem>
          </TogeSidebarMenu>
        </TogeSidebarGroupContent>
      </TogeSidebarGroup>

      <TogeSidebarSeparator />

      <!-- Email Previews -->
      <TogeSidebarGroup>
        <TogeSidebarGroupLabel class="text-[10px] font-semibold text-disabled uppercase tracking-wider px-2">
          Email Previews
        </TogeSidebarGroupLabel>
        <TogeSidebarGroupContent>
          <TogeSidebarMenu>
            <TogeSidebarMenuItem v-for="link in emailLinks" :key="link.to">
              <TogeSidebarMenuButton
                as-child
                :is-active="isActive(link.to)"
                class="rounded-lg font-medium text-disabled hover:text-weak data-[active=true]:text-brand-text"
              >
                <RouterLink :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined">
                  <svg
                    class="h-4 w-4 flex-shrink-0"
                    :class="isActive(link.to) ? 'text-brand' : 'text-disabled'"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.75"
                    stroke="currentColor"
                    aria-hidden="true"
                    v-html="link.icon"
                  />
                  <span>{{ link.label }}</span>
                </RouterLink>
              </TogeSidebarMenuButton>
            </TogeSidebarMenuItem>
          </TogeSidebarMenu>
        </TogeSidebarGroupContent>
      </TogeSidebarGroup>

    </TogeSidebarContent>

    <!-- ── Footer: account identity ─────────────────────────────────────── -->
    <TogeSidebarFooter class="border-t border-sidebar-border px-0 py-0">
      <div class="flex items-center gap-2.5 px-3 py-3.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <div class="h-7 w-7 rounded-full bg-brand-subtle flex items-center justify-center flex-shrink-0">
          <span class="text-[10px] font-semibold text-brand-text">TC</span>
        </div>
        <div class="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
          <p class="text-xs font-medium text-strong truncate">TechCorp PH</p>
          <p class="text-[10px] text-disabled truncate">005-0010-00032-2</p>
        </div>
      </div>
    </TogeSidebarFooter>

  </TogeSidebar>
</template>
