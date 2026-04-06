<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from '.'
import { cn } from '@/lib/utils'
import { togeButtonGroupVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}>()
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="cn(togeButtonGroupVariants({ orientation: props.orientation }), props.class)"
  >
    <slot />
  </div>
</template>
