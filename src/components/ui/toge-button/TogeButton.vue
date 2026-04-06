<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeButtonVariants } from '.'
import { Icon } from '@iconify/vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: TogeButtonVariants['variant']
  tone?: TogeButtonVariants['tone']
  size?: TogeButtonVariants['size']
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  loadingDuration?: number
  fullwidth?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  type: 'button',
  loadingIcon: 'svg-spinners:180-ring',
  loadingDuration: 0.6,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-tone="tone"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :type="as === 'button' && !asChild ? type : undefined"
    :disabled="disabled || loading || undefined"
    :aria-busy="loading || undefined"
    :class="
      cn(
        togeButtonVariants({ variant, tone, size }),
        fullwidth && 'w-full',
        loading && 'relative',
        props.class,
      )
    "
  >
    <Icon
      v-if="loading"
      :icon="loadingIcon!"
      :style="{ animationDuration: `${loadingDuration}s` }"
      aria-hidden="true"
      class="absolute inset-0 m-auto"
    />
    <span
      :class="['inline-flex items-center gap-2', loading && 'opacity-0']"
      :aria-hidden="loading || undefined"
    >
      <slot />
    </span>
    <span v-if="loading" class="sr-only">Loading</span>
  </Primitive>
</template>
