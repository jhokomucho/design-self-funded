import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as TogeAlert } from './TogeAlert.vue'
export { default as TogeAlertDescription } from './TogeAlertDescription.vue'
export { default as TogeAlertTitle } from './TogeAlertTitle.vue'

export const togeAlertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-surface-white border-weak text-strong',
        error: 'bg-surface-white border-weak text-strong [&>svg]:text-destructive',
        warning: 'bg-surface-white border-weak text-strong [&>svg]:text-caution',
        info: 'bg-surface-white border-weak text-strong [&>svg]:text-information',
        success: 'bg-surface-white border-weak text-strong [&>svg]:text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TogeAlertVariants = VariantProps<typeof togeAlertVariants>
