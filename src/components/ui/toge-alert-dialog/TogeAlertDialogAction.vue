<script setup lang="ts">
import type { AlertDialogActionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeButtonVariants } from '@/components/ui/toge-button'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogAction } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeButtonVariants } from '@/components/ui/toge-button'

const props = withDefaults(
  defineProps<
    AlertDialogActionProps & { class?: HTMLAttributes['class']; tone?: TogeButtonVariants['tone'] }
  >(),
  { tone: 'success' },
)

const delegatedProps = reactiveOmit(props, 'class', 'tone')
</script>

<template>
  <AlertDialogAction
    data-slot="alert-dialog-action"
    v-bind="delegatedProps"
    :class="cn(togeButtonVariants({ tone: props.tone }), props.class)"
  >
    <slot />
  </AlertDialogAction>
</template>
