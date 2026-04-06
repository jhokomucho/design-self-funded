<script setup lang="ts">
import type { TogeCarouselClassProps } from './interface'
import type { TogeButtonVariants } from '@/components/ui/toge-button'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { TogeButton } from '@/components/ui/toge-button'
import { useCarousel } from './useCarousel'

const props = withDefaults(
  defineProps<
    {
      variant?: TogeButtonVariants['variant']
      size?: TogeButtonVariants['size']
    } & TogeCarouselClassProps
  >(),
  {
    variant: 'secondary',
    size: 'icon-medium',
  },
)

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <TogeButton
    data-slot="carousel-previous"
    :variant="variant"
    :size="size"
    :disabled="!canScrollPrev"
    :class="
      cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    @click="scrollPrev"
  >
    <slot>
      <Icon icon="lucide:arrow-left" />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </TogeButton>
</template>
