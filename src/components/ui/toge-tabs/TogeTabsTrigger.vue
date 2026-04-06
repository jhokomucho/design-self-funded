<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { type Ref, computed, inject } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)

const variantRef = inject<Ref<'button' | 'underline'>>('tabs-variant')
const variant = computed(() => variantRef?.value ?? 'button')
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        variant === 'underline'
          ? 'relative flex min-w-16 items-center justify-center gap-2 border-b border-(--border-weak) bg-white px-4 py-4 text-sm font-normal uppercase tracking-[0.7px] whitespace-nowrap text-(--text-strong) transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-success data-[state=active]:text-success-text'
          : 'relative -ml-px flex items-center gap-1 border border-(--border-weak) bg-white px-4 py-2 text-sm font-normal whitespace-nowrap text-(--text-strong) transition-colors first:ml-0 first:rounded-l-md last:rounded-r-md focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 data-[state=active]:z-10 data-[state=active]:border-brand data-[state=active]:bg-success-subtle data-[state=active]:text-brand-text',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
