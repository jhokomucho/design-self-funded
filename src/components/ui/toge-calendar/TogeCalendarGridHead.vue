<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CalendarGridHead } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <CalendarGridHead data-slot="calendar-grid-head" v-bind="$attrs" :class="cn('', props.class)">
    <slot />
  </CalendarGridHead>
</template>
