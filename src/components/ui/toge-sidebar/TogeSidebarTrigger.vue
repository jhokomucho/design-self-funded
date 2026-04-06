<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { TogeButton } from '@/components/ui/toge-button'
import { useTogeSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useTogeSidebar()
</script>

<template>
  <TogeButton
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="tertiary"
    size="icon-small"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <Icon icon="ph:sidebar-simple-bold" />
    <span class="sr-only">Toggle Sidebar</span>
  </TogeButton>
</template>
