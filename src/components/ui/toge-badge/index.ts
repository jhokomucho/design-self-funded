import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as TogeBadge } from './TogeBadge.vue'

export const togeBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-[6px] border px-1 py-0.5 label-xs-medium uppercase tracking-wide w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        fill: 'border-transparent',
        outline: '',
      },
      tone: {
        success: '',
        pending: '',
        warning: '',
        danger: '',
        info: '',
        neutral: '',
        plain: '',
      },
    },
    compoundVariants: [
      // ── Fill ─────────────────────────────────────────────────────────────
      { variant: 'fill', tone: 'success', class: 'bg-success text-white' },
      { variant: 'fill', tone: 'pending', class: 'bg-pending text-strong' },
      { variant: 'fill', tone: 'warning', class: 'bg-caution text-white' },
      { variant: 'fill', tone: 'danger', class: 'bg-danger text-white' },
      { variant: 'fill', tone: 'info', class: 'bg-information text-white' },
      { variant: 'fill', tone: 'neutral', class: 'bg-neutral text-strong' },
      { variant: 'fill', tone: 'plain', class: 'bg-surface-white text-strong' },

      // ── Outline ───────────────────────────────────────────────────────────
      {
        variant: 'outline',
        tone: 'success',
        class: 'bg-success-subtle text-success-text border-current',
      },
      {
        variant: 'outline',
        tone: 'pending',
        class: 'bg-pending-subtle text-pending-text border-current',
      },
      {
        variant: 'outline',
        tone: 'warning',
        class: 'bg-caution-subtle text-caution-text border-current',
      },
      {
        variant: 'outline',
        tone: 'danger',
        class: 'bg-danger-subtle text-danger-text border-current',
      },
      {
        variant: 'outline',
        tone: 'info',
        class: 'bg-information-subtle text-information-text border-current',
      },
      {
        variant: 'outline',
        tone: 'neutral',
        class: 'bg-surface-gray text-neutral-text border-current',
      },
      {
        variant: 'outline',
        tone: 'plain',
        class: 'bg-surface-white text-strong border-base',
      },
    ],
    defaultVariants: {
      variant: 'fill',
      tone: 'neutral',
    },
  },
)

export type TogeBadgeVariants = VariantProps<typeof togeBadgeVariants>
