<script setup lang="ts">
import type { ToggleGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem, useForwardProps } from 'reka-ui'
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { togeToggleVariants } from '@/components/ui/toge-toggle'
import { togeToggleGroupContextKey } from './context'

const props = defineProps<
  ToggleGroupItemProps & {
    class?: HTMLAttributes['class']
  }
>()

const context = inject(togeToggleGroupContextKey, {})
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-slot="slotProps"
    data-slot="toggle-group-item"
    :data-size="context.size"
    :data-variant="context.variant"
    v-bind="forwarded"
    :class="
      cn(
        togeToggleVariants({
          size: context.size,
          variant: context.variant,
        }),
        'w-auto min-w-0 shrink-0 px-3',
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>
