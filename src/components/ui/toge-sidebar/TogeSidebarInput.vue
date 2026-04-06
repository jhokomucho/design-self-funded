<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { TogeInput } from '@/components/ui/toge-input'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TogeInput
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="cn('bg-background h-8 w-full shadow-none', props.class)"
  >
    <slot />
  </TogeInput>
</template>
