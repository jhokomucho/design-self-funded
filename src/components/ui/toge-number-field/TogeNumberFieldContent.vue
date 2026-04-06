<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="number-field-content"
    :class="
      cn(
        'relative [&>[data-slot=number-field-input]]:has-[[data-slot=number-field-increment]]:pr-5 [&>[data-slot=number-field-input]]:has-[[data-slot=number-field-decrement]]:pl-5',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
