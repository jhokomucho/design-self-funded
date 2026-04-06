<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TogeAlertVariants } from '.'
import { cn } from '@/lib/utils'
import { togeAlertVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: TogeAlertVariants['variant']
}>()
</script>

<template>
  <div data-slot="alert" :class="cn(togeAlertVariants({ variant }), props.class)" role="alert">
    <slot />
  </div>
</template>
