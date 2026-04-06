<script setup lang="ts">
import type { CalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCell, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCell
    data-slot="calendar-cell"
    v-bind="forwardedProps"
    :class="
      cn(
        'relative h-8 w-8 p-0 text-center text-sm [&:has([data-highlighted])]:bg-primary/10 [&:has([data-highlighted-start])]:rounded-l-md [&:has([data-highlighted-end])]:rounded-r-md',
        props.class,
      )
    "
  >
    <slot />
  </CalendarCell>
</template>
