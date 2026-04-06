<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CalendarGridBody } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <CalendarGridBody data-slot="calendar-grid-body" v-bind="$attrs" :class="cn('', props.class)">
    <slot />
  </CalendarGridBody>
</template>
