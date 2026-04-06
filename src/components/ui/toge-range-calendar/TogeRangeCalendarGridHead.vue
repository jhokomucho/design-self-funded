<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RangeCalendarGridHead } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <RangeCalendarGridHead
    data-slot="range-calendar-grid-head"
    v-bind="$attrs"
    :class="cn('', props.class)"
  >
    <slot />
  </RangeCalendarGridHead>
</template>
