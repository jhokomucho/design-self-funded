<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TogeInputGroupButtonVariants } from '.'
import type { TogeButtonVariants } from '@/components/ui/toge-button'
import { cn } from '@/lib/utils'
import { TogeButton } from '@/components/ui/toge-button'
import { togeInputGroupButtonVariants } from '.'

interface InputGroupButtonProps {
  variant?: TogeButtonVariants['variant']
  size?: TogeInputGroupButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: 'xs',
  variant: 'tertiary',
})
</script>

<template>
  <TogeButton
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(togeInputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </TogeButton>
</template>
