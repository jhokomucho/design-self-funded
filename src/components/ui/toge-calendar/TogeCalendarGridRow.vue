<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CalendarGridRow } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <CalendarGridRow
    data-slot="calendar-grid-row"
    v-bind="$attrs"
    :class="cn('mt-2 flex w-full', props.class)"
  >
    <slot />
  </CalendarGridRow>
</template>
