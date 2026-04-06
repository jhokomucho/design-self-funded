<script setup lang="ts">
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { TogeLabel } from '@/components/ui/toge-label'
import { useFormField } from './useFormField'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>

<template>
  <TogeLabel
    data-slot="form-label"
    :data-error="!!error"
    :for="formItemId"
    :class="cn('data-[error=true]:text-destructive', props.class)"
  >
    <slot />
  </TogeLabel>
</template>
