<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeToggleVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Toggle, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeToggleVariants } from '.'

const props = withDefaults(
  defineProps<
    ToggleProps & {
      class?: HTMLAttributes['class']
      variant?: TogeToggleVariants['variant']
      tone?: TogeToggleVariants['tone']
      size?: TogeToggleVariants['size']
    }
  >(),
  {
    variant: 'tertiary',
    tone: 'neutral',
    size: 'medium',
  },
)

const emits = defineEmits<ToggleEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'tone', 'size')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Toggle
    v-slot="slotProps"
    data-slot="toggle"
    v-bind="forwarded"
    :class="cn(togeToggleVariants({ variant, tone, size }), props.class)"
  >
    <slot v-bind="slotProps" />
  </Toggle>
</template>
