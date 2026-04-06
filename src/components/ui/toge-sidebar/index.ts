import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export interface TogeSidebarProps {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
  class?: HTMLAttributes['class']
}

export { default as TogeSidebar } from './TogeSidebar.vue'
export { default as TogeSidebarContent } from './TogeSidebarContent.vue'
export { default as TogeSidebarFooter } from './TogeSidebarFooter.vue'
export { default as TogeSidebarGroup } from './TogeSidebarGroup.vue'
export { default as TogeSidebarGroupContent } from './TogeSidebarGroupContent.vue'
export { default as TogeSidebarGroupLabel } from './TogeSidebarGroupLabel.vue'
export { default as TogeSidebarHeader } from './TogeSidebarHeader.vue'
export { default as TogeSidebarInput } from './TogeSidebarInput.vue'
export { default as TogeSidebarInset } from './TogeSidebarInset.vue'
export { default as TogeSidebarMenu } from './TogeSidebarMenu.vue'
export { default as TogeSidebarMenuButton } from './TogeSidebarMenuButton.vue'
export { default as TogeSidebarMenuItem } from './TogeSidebarMenuItem.vue'
export { default as TogeSidebarProvider } from './TogeSidebarProvider.vue'
export { default as TogeSidebarSeparator } from './TogeSidebarSeparator.vue'
export { default as TogeSidebarTrigger } from './TogeSidebarTrigger.vue'

export { useTogeSidebar } from './utils'

export const togeSidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type TogeSidebarMenuButtonVariants = VariantProps<typeof togeSidebarMenuButtonVariants>
