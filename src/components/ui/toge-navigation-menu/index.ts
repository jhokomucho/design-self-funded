import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as TogeNavigationMenu } from './TogeNavigationMenu.vue'
export { default as TogeNavigationMenuContent } from './TogeNavigationMenuContent.vue'
export { default as TogeNavigationMenuIndicator } from './TogeNavigationMenuIndicator.vue'
export { default as TogeNavigationMenuItem } from './TogeNavigationMenuItem.vue'
export { default as TogeNavigationMenuLink } from './TogeNavigationMenuLink.vue'
export { default as TogeNavigationMenuList } from './TogeNavigationMenuList.vue'
export { default as TogeNavigationMenuTrigger } from './TogeNavigationMenuTrigger.vue'
export { default as TogeNavigationMenuViewport } from './TogeNavigationMenuViewport.vue'

export const togeNavigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:text-strong focus:bg-surface-hover focus:text-strong focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-brand-subtle',
)

export type TogeNavigationMenuTriggerVariants = VariantProps<typeof togeNavigationMenuTriggerStyle>
