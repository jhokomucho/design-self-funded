<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RangeCalendarGridRow } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <RangeCalendarGridRow
    data-slot="range-calendar-grid-row"
    v-bind="$attrs"
    :class="cn('mt-2 flex w-full', props.class)"
  >
    <slot />
  </RangeCalendarGridRow>
</template>
