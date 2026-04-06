<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { TogeInput } from '@/components/ui/toge-input'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TogeInput
    data-slot="input-group-control"
    :class="
      cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent overflow-hidden',
        props.class,
      )
    "
  />
</template>
