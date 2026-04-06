import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon } from '@iconify/vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeButton } from '@/components/ui/toge-button'

import { TogePopover, TogePopoverContent, TogePopoverTrigger } from '.'

const meta = {
  title: 'Toge UI/Popover',
  component: TogePopover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-popover'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogePopover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogePopover, TogePopoverTrigger, TogePopoverContent, TogeButton, Icon },
    template: `
      <TogePopover>
        <TogePopoverTrigger as-child>
          <TogeButton variant="outline" size="sm">
            <Icon icon="ph:caret-down" class="size-4" />
            Open
          </TogeButton>
        </TogePopoverTrigger>
        <TogePopoverContent class="w-56 p-3">
          <p class="text-sm font-medium">Popover</p>
          <p class="text-xs text-muted-foreground">Short contextual content.</p>
        </TogePopoverContent>
      </TogePopover>
    `,
  }),
}
