<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RangeCalendarHeader } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <RangeCalendarHeader
    data-slot="range-calendar-header"
    v-bind="$attrs"
    :class="cn('relative flex w-full items-center justify-center pt-1', props.class)"
  >
    <slot />
  </RangeCalendarHeader>
</template>
