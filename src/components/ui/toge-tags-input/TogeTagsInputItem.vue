<script setup lang="ts">
import type { TagsInputItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItem
    data-slot="tags-input-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'bg-surface-adaptive text-secondary-foreground ring-offset-background flex h-6 shrink-0 items-center whitespace-nowrap rounded-md data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-2',
        props.class,
      )
    "
  >
    <slot />
  </TagsInputItem>
</template>
