<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { TogeSeparator } from '@/components/ui/toge-separator'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TogeSeparator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    :class="cn('bg-sidebar-border mx-2 w-auto', props.class)"
  >
    <slot />
  </TogeSeparator>
</template>
