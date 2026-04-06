<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CalendarHeader } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <CalendarHeader
    data-slot="calendar-header"
    v-bind="$attrs"
    :class="cn('relative flex w-full items-center justify-center px-8 pt-1', props.class)"
  >
    <slot />
  </CalendarHeader>
</template>
