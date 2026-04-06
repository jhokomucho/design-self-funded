<script setup lang="ts">
import type { TogeCarouselClassProps } from './interface'
import { cn } from '@/lib/utils'
import { useCarousel } from './useCarousel'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<TogeCarouselClassProps>()

const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div ref="carouselRef" data-slot="carousel-content" class="overflow-hidden">
    <div
      v-bind="$attrs"
      :class="cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', props.class)"
    >
      <slot />
    </div>
  </div>
</template>
