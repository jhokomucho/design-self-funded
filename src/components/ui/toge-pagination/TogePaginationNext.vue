<script setup lang="ts">
import type { PaginationNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeButtonVariants } from '@/components/ui/toge-button'
import { reactiveOmit } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { PaginationNext, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '@/components/ui/toge-button'

const props = withDefaults(
  defineProps<
    PaginationNextProps & {
      size?: TogeButtonVariants['size']
      class?: HTMLAttributes['class']
    }
  >(),
  {
    size: 'medium',
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationNext
    data-slot="pagination-next"
    :class="
      cn(
        togeButtonVariants({ variant: 'tertiary', size, tone: 'neutral' }),
        'gap-1 px-2.5 sm:pr-2.5',
        props.class,
      )
    "
    v-bind="forwarded"
  >
    <slot>
      <span class="hidden sm:block">Next</span>
      <Icon icon="ph:caret-right" />
    </slot>
  </PaginationNext>
</template>
