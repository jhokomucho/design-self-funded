<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxRoot v-slot="slotProps" data-slot="combobox" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </ComboboxRoot>
</template>
