<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import {
  TogeDialog,
  TogeDialogContent,
  TogeDialogDescription,
  TogeDialogHeader,
  TogeDialogTitle,
} from '@/components/ui/toge-dialog'
import TogeCommand from './TogeCommand.vue'

const props = withDefaults(
  defineProps<
    DialogRootProps & {
      title?: string
      description?: string
    }
  >(),
  {
    title: 'Command Palette',
    description: 'Search for a command to run...',
  },
)
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TogeDialog v-slot="slotProps" v-bind="forwarded">
    <TogeDialogContent class="overflow-hidden p-0">
      <TogeDialogHeader class="sr-only">
        <TogeDialogTitle>{{ title }}</TogeDialogTitle>
        <TogeDialogDescription>{{ description }}</TogeDialogDescription>
      </TogeDialogHeader>
      <TogeCommand>
        <slot v-bind="slotProps" />
      </TogeCommand>
    </TogeDialogContent>
  </TogeDialog>
</template>
