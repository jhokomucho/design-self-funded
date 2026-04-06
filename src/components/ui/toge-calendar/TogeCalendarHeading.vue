<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CalendarHeading } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <CalendarHeading
    data-slot="calendar-heading"
    v-bind="$attrs"
    :class="cn('text-sm font-medium', props.class)"
  >
    <slot />
  </CalendarHeading>
</template>
