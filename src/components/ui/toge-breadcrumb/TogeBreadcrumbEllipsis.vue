<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    aria-hidden="true"
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    :class="cn('flex size-9 items-center justify-center', props.class)"
  >
    <slot>...</slot>
    <span class="sr-only">More</span>
  </span>
</template>
