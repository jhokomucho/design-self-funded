<script setup lang="ts">
import type { RangeCalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarCellTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '@/components/ui/toge-button'

const props = withDefaults(
  defineProps<RangeCalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'button',
  },
)

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarCellTrigger
    data-slot="range-calendar-trigger"
    v-bind="{ ...$attrs, ...forwardedProps }"
    :class="
      cn(
        togeButtonVariants({ variant: 'tertiary', tone: 'neutral' }),
        'h-8 w-8 p-0 font-normal text-strong hover:bg-surface-hover data-[selected]:opacity-100 data-highlighted:bg-transparent data-highlighted:hover:bg-surface-hover data-highlighted:text-strong data-[selected]:bg-transparent data-[selected]:hover:bg-surface-hover data-[selected]:text-strong',
        '[&[data-today]:not([data-selected])]:bg-brand-subtle [&[data-today]:not([data-selected])]:text-brand [&[data-today]:not([data-selected])]:border [&[data-today]:not([data-selected])]:border-brand',
        'data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground',
        'data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground',
        'data-[outside-view]:text-muted-foreground',
        'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
        'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
        props.class,
      )
    "
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>
