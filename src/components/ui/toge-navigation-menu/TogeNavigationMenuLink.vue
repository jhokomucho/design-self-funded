<script setup lang="ts">
import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuLink, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuLinkProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<NavigationMenuLinkEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwarded"
    :class="
      cn(
        'data-active:focus:bg-brand data-active:hover:bg-surface-hover data-active:bg-brand-subtle data-active:text-strong hover:bg-surface-hover hover:text-strong focus:bg-brand-subtle focus:text-strong ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex flex-col gap-1 rounded-sm p-2 text-sm transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuLink>
</template>
