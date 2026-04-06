<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'
import { Icon } from '@iconify/vue'
import { Toaster as Sonner } from 'vue-sonner'
import { cn } from '@/lib/utils'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    data-slot="sonner"
    v-bind="props"
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
  >
    <template #success-icon>
      <Icon icon="ph:check-circle-fill" class="size-5 text-success" />
    </template>
    <template #info-icon>
      <Icon icon="ph:info-fill" class="size-5 text-information" />
    </template>
    <template #warning-icon>
      <Icon icon="ph:warning-fill" class="size-5 text-caution" />
    </template>
    <template #error-icon>
      <Icon icon="ph:x-circle-fill" class="size-5 text-destructive" />
    </template>
    <template #loading-icon>
      <div>
        <Icon icon="lucide:loader-circle" class="size-5 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <Icon icon="lucide:x" class="size-5" />
    </template>
  </Sonner>
</template>
