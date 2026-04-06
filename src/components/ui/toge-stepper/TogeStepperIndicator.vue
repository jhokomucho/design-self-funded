<script setup lang="ts">
import type { StepperIndicatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { StepperIndicator, injectStepperItemContext, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<StepperIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)

const context = injectStepperItemContext()
</script>

<template>
  <StepperIndicator
    v-slot="slotProps"
    data-slot="stepper-indicator"
    v-bind="forwarded"
    :class="
      cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-full border border-weak bg-surface-white text-muted-foreground',
        'group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50',
        'group-data-[state=active]:border-primary group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
        'group-data-[state=completed]:border-transparent group-data-[state=completed]:bg-brand group-data-[state=completed]:text-primary-foreground',
        props.class,
      )
    "
  >
    <Icon v-if="context.state.value === 'completed'" icon="ph:check-bold" class="size-4" />
    <slot v-else v-bind="slotProps" />
  </StepperIndicator>
</template>
