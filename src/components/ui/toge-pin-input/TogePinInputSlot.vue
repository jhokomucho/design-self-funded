<script setup lang="ts">
import type { PinInputInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PinInputInput, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<PinInputInputProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <PinInputInput
    data-slot="pin-input-slot"
    v-bind="forwardedProps"
    :class="
      cn(
        'border-input bg-background text-foreground focus-visible:ring-ring flex h-9 w-9 items-center justify-center border-y border-r text-center text-sm shadow-xs outline-none transition-all first:rounded-l-md first:border-l last:rounded-r-md focus-visible:z-10 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  />
</template>
