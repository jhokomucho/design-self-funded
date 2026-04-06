<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarNext, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '@/components/ui/toge-button'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarNext
    data-slot="calendar-next-button"
    v-bind="{ ...$attrs, ...forwardedProps }"
    :class="
      cn(
        togeButtonVariants({ variant: 'secondary', tone: 'neutral', size: 'icon-small' }),
        'bg-transparent p-0 hover:opacity-100',
        props.class,
      )
    "
  >
    <slot>
      <Icon icon="lucide:chevron-right" class="size-4" />
    </slot>
  </CalendarNext>
</template>
