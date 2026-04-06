<script setup lang="ts">
import type { SelectValueProps } from 'reka-ui'
import { SelectValue } from 'reka-ui'

const props = defineProps<SelectValueProps>()
</script>

<template>
  <SelectValue data-slot="select-value" class="text-strong" v-bind="props">
    <slot />
  </SelectValue>
</template>
