<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    aria-hidden="true"
    data-slot="breadcrumb-separator"
    role="presentation"
    :class="cn('[&>svg]:size-3.5', props.class)"
  >
    <slot>
      <Icon icon="ph:caret-right-bold" />
    </slot>
  </li>
</template>
