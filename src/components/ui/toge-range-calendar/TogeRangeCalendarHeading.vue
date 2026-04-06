<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RangeCalendarHeading } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <RangeCalendarHeading
    data-slot="range-calendar-heading"
    v-bind="$attrs"
    :class="cn('text-sm font-medium', props.class)"
  >
    <slot />
  </RangeCalendarHeading>
</template>
