<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TogeBadgeVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { togeBadgeVariants } from '.'

const props = defineProps<
  PrimitiveProps & {
    variant?: TogeBadgeVariants['variant']
    tone?: TogeBadgeVariants['tone']
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive
    data-slot="badge"
    :class="cn(togeBadgeVariants({ variant, tone }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>
