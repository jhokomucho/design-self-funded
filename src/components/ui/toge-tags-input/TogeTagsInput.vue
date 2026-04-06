<script setup lang="ts">
import type { TagsInputRootEmits, TagsInputRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TagsInputRoot
    v-slot="slotProps"
    data-slot="tags-input"
    v-bind="forwarded"
    :class="
      cn(
        'border-input bg-surface-white flex flex-wrap items-center gap-2 rounded-md border px-2 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50',
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </TagsInputRoot>
</template>
