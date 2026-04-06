<script setup lang="ts">
import type { TogeCarouselClassProps, TogeCarouselEmits, TogeCarouselProps } from './interface'
import { cn } from '@/lib/utils'
import { useProvideCarousel } from './useCarousel'

const props = withDefaults(defineProps<TogeCarouselProps & TogeCarouselClassProps>(), {
  orientation: 'horizontal',
})

const emits = defineEmits<TogeCarouselEmits>()

const {
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
} = useProvideCarousel(props, emits)

defineExpose({
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
})

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    scrollPrev()
    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    scrollNext()
  }
}
</script>

<template>
  <div
    data-slot="carousel"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    :class="cn('relative', props.class)"
    @keydown="onKeyDown"
  >
    <slot
      :can-scroll-next="canScrollNext"
      :can-scroll-prev="canScrollPrev"
      :carousel-api="carouselApi"
      :carousel-ref="carouselRef"
      :orientation="orientation"
      :scroll-next="scrollNext"
      :scroll-prev="scrollPrev"
    />
  </div>
</template>
