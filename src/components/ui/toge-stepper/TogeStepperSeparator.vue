<script setup lang="ts">
import type { StepperSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { StepperSeparator, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<StepperSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperSeparator
    data-slot="stepper-separator"
    v-bind="forwarded"
    :class="
      cn(
        'bg-border-weak group-data-[disabled]:bg-border-weak group-data-[disabled]:opacity-50 group-data-[state=completed]:bg-primary',
        props.class,
      )
    "
  />
</template>
