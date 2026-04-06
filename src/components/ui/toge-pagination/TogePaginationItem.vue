<script setup lang="ts">
import type { PaginationListItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeButtonVariants } from '@/components/ui/toge-button'
import { reactiveOmit } from '@vueuse/core'
import { PaginationListItem } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '@/components/ui/toge-button'

const props = withDefaults(
  defineProps<
    PaginationListItemProps & {
      size?: TogeButtonVariants['size']
      class?: HTMLAttributes['class']
      isActive?: boolean
    }
  >(),
  {
    size: 'icon-medium',
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'isActive')
</script>

<template>
  <PaginationListItem
    data-slot="pagination-item"
    v-bind="delegatedProps"
    :class="
      cn(
        togeButtonVariants({
          variant: isActive ? 'primary' : 'secondary',
          size,
          tone: isActive ? 'success' : 'neutral',
        }),
        props.class,
      )
    "
  >
    <slot />
  </PaginationListItem>
</template>
