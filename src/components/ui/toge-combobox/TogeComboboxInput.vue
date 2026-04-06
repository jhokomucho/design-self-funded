<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxInput, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <div
    data-slot="combobox-input-wrapper"
    class="flex h-9 items-center gap-2 border-b border-b-input px-3"
  >
    <Icon icon="ph:magnifying-glass" class="size-4 shrink-0 opacity-50" />
    <ComboboxInput
      data-slot="combobox-input"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'placeholder:text-muted-foreground flex h-full w-full bg-transparent text-sm text-strong outline-none disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
    >
      <slot />
    </ComboboxInput>
  </div>
</template>
