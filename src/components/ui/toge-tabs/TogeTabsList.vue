<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed, provide } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<
  TabsListProps & {
    class?: HTMLAttributes['class']
    variant?: 'button' | 'underline'
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')

provide(
  'tabs-variant',
  computed(() => props.variant ?? 'button'),
)
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn('inline-flex h-fit items-center', props.class)"
  >
    <slot />
  </TabsList>
</template>
