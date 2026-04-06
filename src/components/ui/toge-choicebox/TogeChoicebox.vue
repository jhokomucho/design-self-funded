<script setup lang="ts">
import type { ListboxRootEmits, ListboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed, provide } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ListboxContent, ListboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ListboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ListboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

provide(
  'choicebox-multiple',
  computed(() => props.multiple),
)
</script>

<template>
  <ListboxRoot data-slot="choicebox" v-bind="forwarded">
    <ListboxContent v-bind="$attrs" :class="cn('grid gap-3', props.class)">
      <slot />
    </ListboxContent>
  </ListboxRoot>
</template>
