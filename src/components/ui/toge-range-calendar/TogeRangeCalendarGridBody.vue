<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { RangeCalendarGridBody } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <RangeCalendarGridBody
    data-slot="range-calendar-grid-body"
    v-bind="$attrs"
    :class="cn('', props.class)"
  >
    <slot />
  </RangeCalendarGridBody>
</template>
