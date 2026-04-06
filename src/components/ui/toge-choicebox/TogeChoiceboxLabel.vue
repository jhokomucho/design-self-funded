<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span data-slot="choicebox-label" :class="cn('text-sm font-medium text-strong', props.class)">
    <slot />
  </span>
</template>
