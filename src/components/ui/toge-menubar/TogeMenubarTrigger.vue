<script setup lang="ts">
import type { MenubarTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { MenubarTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        'focus:bg-brand focus:text-on-brand data-[state=open]:bg-brand data-[state=open]:text-on-brand flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none',
        props.class,
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>
