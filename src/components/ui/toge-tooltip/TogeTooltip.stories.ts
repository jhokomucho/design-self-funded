import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeButton } from '@/components/ui/toge-button'

import { TogeTooltip, TogeTooltipContent, TogeTooltipProvider, TogeTooltipTrigger } from '.'

const meta = {
  title: 'Toge UI/Tooltip',
  component: TogeTooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-tooltip'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeTooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeTooltipProvider,
      TogeTooltip,
      TogeTooltipTrigger,
      TogeTooltipContent,
      TogeButton,
    },
    template: `
      <TogeTooltipProvider>
        <TogeTooltip :delay-duration="0">
          <TogeTooltipTrigger as-child>
            <TogeButton variant="secondary" tone="neutral" size="small">Hover me</TogeButton>
          </TogeTooltipTrigger>
          <TogeTooltipContent>Tooltip content</TogeTooltipContent>
        </TogeTooltip>
      </TogeTooltipProvider>
    `,
  }),
}
