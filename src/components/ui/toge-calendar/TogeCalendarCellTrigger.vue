<script setup lang="ts">
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '@/components/ui/toge-button'

const props = withDefaults(
  defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'button',
  },
)

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    data-slot="calendar-cell-trigger"
    v-bind="{ ...$attrs, ...forwardedProps }"
    :class="
      cn(
        togeButtonVariants({ variant: 'tertiary', tone: 'neutral' }),
        'size-8 cursor-default p-0 font-normal text-strong aria-selected:opacity-100',
        '[&[data-today]:not([data-selected])]:bg-brand-subtle [&[data-today]:not([data-selected])]:text-brand [&[data-today]:not([data-selected])]:border [&[data-today]:not([data-selected])]:border-brand',
        'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
        'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
        'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
        'data-[outside-view]:text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </CalendarCellTrigger>
</template>
