<script setup lang="ts">
import type { StepperTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { StepperTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTrigger
    data-slot="stepper-trigger"
    v-bind="forwarded"
    :class="
      cn(
        'flex flex-col items-center gap-1 rounded-md p-1 text-center hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        props.class,
      )
    "
  >
    <slot />
  </StepperTrigger>
</template>
