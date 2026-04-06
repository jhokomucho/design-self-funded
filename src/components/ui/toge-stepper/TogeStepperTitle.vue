<script setup lang="ts">
import type { StepperTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { StepperTitle, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<StepperTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperTitle
    data-slot="stepper-title"
    v-bind="forwarded"
    :class="cn('text-md whitespace-nowrap font-semibold', props.class)"
  >
    <slot />
  </StepperTitle>
</template>
