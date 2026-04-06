<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RangeCalendarHeadCell } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <RangeCalendarHeadCell
    data-slot="range-calendar-head-cell"
    v-bind="$attrs"
    :class="cn('text-muted-foreground w-8 rounded-md text-[0.8rem] font-normal', props.class)"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>
