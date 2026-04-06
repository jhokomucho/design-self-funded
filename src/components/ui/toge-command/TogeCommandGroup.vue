<script setup lang="ts">
import type { ListboxGroupProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ListboxGroup, ListboxGroupLabel, useId } from 'reka-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { provideCommandGroupContext, useCommand } from './context'

const props = defineProps<
  ListboxGroupProps & {
    class?: HTMLAttributes['class']
    heading?: string
  }
>()

const delegatedProps = reactiveOmit(props, 'class')

const { allGroups, filterState } = useCommand()
const id = useId()

const isRender = computed(() => !filterState.search || filterState.filtered.groups.has(id))

provideCommandGroupContext({ id })

onMounted(() => {
  if (!allGroups.value.has(id)) allGroups.value.set(id, new Set())
})

onUnmounted(() => {
  allGroups.value.delete(id)
})
</script>

<template>
  <ListboxGroup
    :id="id"
    data-slot="command-group"
    v-bind="delegatedProps"
    :class="cn('text-foreground overflow-hidden p-1', props.class)"
    :hidden="isRender ? undefined : true"
  >
    <ListboxGroupLabel
      v-if="heading"
      data-slot="command-group-heading"
      class="px-2 py-1.5 label-xs-medium text-base uppercase"
    >
      {{ heading }}
    </ListboxGroupLabel>
    <slot />
  </ListboxGroup>
</template>
