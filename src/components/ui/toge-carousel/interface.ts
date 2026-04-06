import type useEmblaCarousel from 'embla-carousel-vue'
import type { EmblaCarouselVueType } from 'embla-carousel-vue'
import type { HTMLAttributes, UnwrapRef } from 'vue'

type CarouselApi = EmblaCarouselVueType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

export type UnwrapRefCarouselApi = UnwrapRef<CarouselApi>

export interface TogeCarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
}

export interface TogeCarouselEmits {
  (e: 'init-api', payload: UnwrapRefCarouselApi): void
}

export interface TogeCarouselClassProps {
  class?: HTMLAttributes['class']
}
