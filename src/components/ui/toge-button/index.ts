import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as TogeButton } from './TogeButton.vue'

export const togeButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition duration-150 ease-in-out shrink-0 outline-none cursor-pointer select-none focus-visible:ring-[3px] focus-visible:ring-offset-1 active:scale-[0.98] hover:shadow-[inset_0_-2px_1px_0_rgba(0,0,0,0.10)] active:shadow-[inset_0_2px_1px_0_rgba(0,0,0,0.15)] [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none',
  {
    variants: {
      variant: {
        primary: '',
        secondary: 'border bg-surface-white',
        tertiary: 'bg-transparent',
      },
      tone: {
        neutral: '',
        success: '',
        danger: '',
      },
      size: {
        small:
          "h-7 px-2 text-200 rounded-[8px] gap-1.5 [&_svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-1.5",
        medium:
          "h-9 px-3 text-300 rounded-[8px] [&_svg:not([class*='size-'])]:size-4 has-[>svg]:px-2.5",
        large:
          "h-11 px-4 py-3 text-400 rounded-[8px] [&_svg:not([class*='size-'])]:size-[18px] has-[>svg]:px-3.5",
        'icon-small': "size-7 rounded-[8px] [&_svg:not([class*='size-'])]:size-3.5",
        'icon-medium': "size-9 rounded-[8px] [&_svg:not([class*='size-'])]:size-4",
        'icon-large': "size-11 rounded-[8px] [&_svg:not([class*='size-'])]:size-[18px]",
      },
    },
    compoundVariants: [
      // ── Primary ──────────────────────────────────────────────────────────
      {
        variant: 'primary',
        tone: 'neutral',
        class:
          'bg-neutral text-on-neutral hover:bg-neutral-hover active:bg-neutral-pressed focus-visible:ring-mushroom-400/30 disabled:bg-surface-disabled disabled:[color:var(--text-on-fill-disabled)]',
      },
      {
        variant: 'primary',
        tone: 'success',
        class:
          'bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-pressed focus-visible:ring-brand/30 disabled:bg-surface-disabled disabled:[color:var(--text-on-fill-disabled)]',
      },
      {
        variant: 'primary',
        tone: 'danger',
        class:
          'bg-danger text-on-danger hover:bg-danger-hover active:bg-danger-pressed focus-visible:ring-danger/30 disabled:bg-surface-disabled disabled:[color:var(--text-on-fill-disabled)]',
      },

      // ── Secondary ────────────────────────────────────────────────────────
      {
        variant: 'secondary',
        tone: 'neutral',
        class:
          'border-neutral-border text-strong hover:bg-surface-hover active:bg-surface-pressed focus-visible:ring-mushroom-400/30 disabled:[border-color:var(--border-on-fill-disabled)] disabled:[color:var(--text-disabled)]',
      },
      {
        variant: 'secondary',
        tone: 'success',
        class:
          'border-brand text-brand-text hover:bg-surface-hover active:bg-surface-pressed focus-visible:ring-brand/30 disabled:[border-color:var(--border-on-fill-disabled)] disabled:[color:var(--text-disabled)]',
      },
      {
        variant: 'secondary',
        tone: 'danger',
        class:
          'border-danger text-danger-text hover:bg-surface-hover active:bg-surface-pressed focus-visible:ring-danger/30 disabled:[border-color:var(--border-on-fill-disabled)] disabled:[color:var(--text-disabled)]',
      },

      // ── Tertiary ─────────────────────────────────────────────────────────
      {
        variant: 'tertiary',
        tone: 'neutral',
        class:
          'text-strong hover:bg-surface-hover active:bg-surface-pressed focus-visible:ring-mushroom-400/30 disabled:[color:var(--text-disabled)]',
      },
      {
        variant: 'tertiary',
        tone: 'success',
        class:
          'text-brand-text hover:bg-surface-hover active:bg-surface-pressed focus-visible:ring-brand/30 disabled:[color:var(--text-disabled)]',
      },
      {
        variant: 'tertiary',
        tone: 'danger',
        class:
          'text-danger-text hover:bg-surface-hover active:bg-surface-pressed focus-visible:ring-danger/30 disabled:[color:var(--text-disabled)]',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      tone: 'success',
      size: 'medium',
    },
  },
)

export type TogeButtonVariants = VariantProps<typeof togeButtonVariants>
