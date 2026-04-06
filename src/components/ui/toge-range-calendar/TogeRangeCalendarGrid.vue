<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RangeCalendarGrid } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <RangeCalendarGrid
    data-slot="range-calendar-grid"
    v-bind="$attrs"
    :class="cn('w-full border-collapse space-y-1', props.class)"
  >
    <slot />
  </RangeCalendarGrid>
</template>
