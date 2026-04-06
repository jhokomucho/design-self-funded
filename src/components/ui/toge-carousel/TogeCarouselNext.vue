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

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <TogeButton
    data-slot="carousel-next"
    :variant="variant"
    :size="size"
    :disabled="!canScrollNext"
    :class="
      cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    @click="scrollNext"
  >
    <slot>
      <Icon icon="lucide:arrow-right" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </TogeButton>
</template>
