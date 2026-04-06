<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppSideNav from '@/components/AppSideNav.vue'
import { TogeSidebarInset, TogeSidebarProvider } from '@/components/ui/toge-sidebar'

const route = useRoute()
const isEmailRoute = computed(() => route.path.startsWith('/email'))
</script>

<template>
  <div class="min-h-screen font-sans antialiased">

    <!-- Email routes — no sidebar, full-width -->
    <template v-if="isEmailRoute">
      <RouterView />
    </template>

    <!-- All other routes — sidebar layout -->
    <TogeSidebarProvider v-else>
      <AppSideNav />
      <TogeSidebarInset class="bg-surface-gray">
        <RouterView />
      </TogeSidebarInset>
    </TogeSidebarProvider>

  </div>
</template>
