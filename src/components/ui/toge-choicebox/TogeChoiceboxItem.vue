<script setup lang="ts">
import type { ListboxItemEmits, ListboxItemProps } from 'reka-ui'
import type { ComputedRef } from 'vue'
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { ListboxItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ListboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ListboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const _injectedMultiple = inject<ComputedRef<boolean>>('choicebox-multiple')
const isMultiple = computed(() => _injectedMultiple?.value ?? false)

function handleTabKey(event: KeyboardEvent) {
  if (event.key !== 'Tab') return

  const currentEl = event.currentTarget as HTMLElement
  const container = currentEl.closest('[data-slot="choicebox"]')
  if (!container) return

  const items = Array.from(
    container.querySelectorAll<HTMLElement>('[data-slot="choicebox-item"]:not([data-disabled])'),
  )
  const currentIndex = items.indexOf(currentEl)
  if (currentIndex === -1) return

  const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1
  const target = items[nextIndex]

  // At boundaries, let the browser handle Tab naturally (focus exits the component)
  if (!target) return

  event.preventDefault()
  target.focus()
}
</script>

<template>
  <ListboxItem
    data-slot="choicebox-item"
    v-bind="forwarded"
    :aria-disabled="props.disabled || undefined"
    @keydown="handleTabKey"
    :class="
      cn(
        'group relative flex cursor-pointer flex-col gap-1 rounded-[8px] border border-weak bg-transparent p-4 pr-10 text-left outline-none transition-[color,box-shadow,border-color,background-color] select-none',
        'hover:bg-surface-hover',
        'data-[state=checked]:border-brand data-[state=checked]:bg-brand-subtle',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        props.class,
      )
    "
  >
    <!-- Radio indicator (single selection) — decorative, selection conveyed via aria-selected -->
    <div
      v-if="!isMultiple"
      aria-hidden="true"
      class="absolute right-3 top-3 size-4 shrink-0 rounded-full border border-base transition-[border-color,background-color,box-shadow] group-data-[state=checked]:border-brand group-data-[state=checked]:bg-brand group-data-[state=checked]:shadow-[inset_0_0_0_2px_white]"
    />

    <!-- Checkbox indicator (multiple selection) — decorative, selection conveyed via aria-selected -->
    <div
      v-else
      aria-hidden="true"
      class="absolute right-3 top-3 grid size-4 shrink-0 place-content-center rounded-[4px] border border-base transition-[border-color,background-color] group-data-[state=checked]:border-brand group-data-[state=checked]:bg-brand"
    >
      <Icon
        icon="ph:check"
        class="size-3 text-on-brand opacity-0 transition-opacity group-data-[state=checked]:opacity-100"
      />
    </div>

    <slot />
  </ListboxItem>
</template>
