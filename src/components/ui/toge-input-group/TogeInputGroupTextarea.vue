<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { TogeTextarea } from '@/components/ui/toge-textarea'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TogeTextarea
    data-slot="input-group-control"
    :class="
      cn(
        'flex-1 resize-none rounded-none border-0 bg-surface-white py-3 shadow-none focus-visible:ring-0 dark:bg-surface-white',
        props.class,
      )
    "
  />
</template>
