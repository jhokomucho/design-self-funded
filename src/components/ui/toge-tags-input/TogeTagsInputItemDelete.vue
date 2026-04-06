<script setup lang="ts">
import type { TagsInputItemDeleteProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputItemDelete, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItemDelete
    data-slot="tags-input-item-delete"
    v-bind="forwardedProps"
    :class="cn('mr-1 flex rounded bg-transparent', props.class)"
  >
    <slot>
      <Icon icon="lucide:x" class="h-4 w-4" />
    </slot>
  </TagsInputItemDelete>
</template>
