<script setup lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CollapsibleTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<CollapsibleTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CollapsibleTrigger
    data-slot="collapsible-trigger"
    v-bind="delegatedProps"
    :class="
      cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center gap-2 rounded-md text-sm font-medium outline-none transition-colors focus-visible:ring-[3px]',
        props.class,
      )
    "
  >
    <slot />
  </CollapsibleTrigger>
</template>
