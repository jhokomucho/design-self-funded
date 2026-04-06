<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldIncrement, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <NumberFieldIncrement
    data-slot="number-field-increment"
    v-bind="forwarded"
    :class="
      cn(
        'absolute top-1/2 right-0 -translate-y-1/2 p-3 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-20',
        props.class,
      )
    "
  >
    <slot>
      <Icon icon="lucide:plus" class="h-4 w-4" />
    </slot>
  </NumberFieldIncrement>
</template>
