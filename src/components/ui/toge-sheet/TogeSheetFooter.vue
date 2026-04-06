<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose } from 'reka-ui'
import { cn } from '@/lib/utils'
import { TogeButton } from '@/components/ui/toge-button'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    showCloseButton?: boolean
  }>(),
  {
    showCloseButton: false,
  },
)
</script>

<template>
  <div
    data-slot="sheet-footer"
    :class="
      cn('mt-auto flex flex-col-reverse gap-2 p-4 border-t sm:flex-row sm:justify-end', props.class)
    "
  >
    <slot />
    <DialogClose v-if="showCloseButton" as-child>
      <TogeButton variant="secondary">Close</TogeButton>
    </DialogClose>
  </div>
</template>
