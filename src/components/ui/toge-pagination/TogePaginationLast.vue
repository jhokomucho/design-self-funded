<script setup lang="ts">
import type { PaginationLastProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeButtonVariants } from '@/components/ui/toge-button'
import { reactiveOmit } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { PaginationLast, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '@/components/ui/toge-button'

const props = withDefaults(
  defineProps<
    PaginationLastProps & {
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
  <PaginationLast
    data-slot="pagination-last"
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
      <span class="hidden sm:block">Last</span>
      <Icon icon="ph:caret-right" />
    </slot>
  </PaginationLast>
</template>
