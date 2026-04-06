<script setup lang="ts">
import type { RangeCalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarCell, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarCell
    data-slot="range-calendar-cell"
    v-bind="forwardedProps"
    :class="
      cn(
        'relative h-8 w-8 p-0 text-center text-sm',
        '[&:has([data-highlighted])]:bg-surface-hover [&:has([data-selected])]:bg-brand-subtle',
        '[&:has([data-highlighted-start])]:rounded-l-md [&:has([data-selection-start])]:rounded-l-md',
        '[&:has([data-highlighted-end])]:rounded-r-md [&:has([data-selection-end])]:rounded-r-md',
        props.class,
      )
    "
  >
    <slot />
  </RangeCalendarCell>
</template>
