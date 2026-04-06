<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeToggleVariants } from '@/components/ui/toge-toggle'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { provide } from 'vue'
import { cn } from '@/lib/utils'
import { togeToggleGroupContextKey } from './context'

const props = defineProps<
  ToggleGroupRootProps & {
    class?: HTMLAttributes['class']
    variant?: TogeToggleVariants['variant']
    size?: TogeToggleVariants['size']
  }
>()
const emits = defineEmits<ToggleGroupRootEmits>()

provide(togeToggleGroupContextKey, {
  variant: props.variant,
  size: props.size,
})

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot
    v-slot="slotProps"
    data-slot="toggle-group"
    :data-size="size"
    :data-variant="variant"
    v-bind="forwarded"
    :class="cn('flex w-fit items-center gap-1 rounded-md', props.class)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
