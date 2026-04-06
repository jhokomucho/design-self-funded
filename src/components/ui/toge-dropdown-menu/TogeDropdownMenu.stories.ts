import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { TogeButton } from '@/components/ui/toge-button'
import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeDropdownMenu,
  TogeDropdownMenuContent,
  TogeDropdownMenuItem,
  TogeDropdownMenuTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Dropdown Menu',
  component: TogeDropdownMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-dropdown-menu'),
      },
    },
  },
} satisfies Meta<typeof TogeDropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeButton,
      TogeDropdownMenu,
      TogeDropdownMenuContent,
      TogeDropdownMenuItem,
      TogeDropdownMenuTrigger,
    },
    template: `
      <TogeDropdownMenu>
        <TogeDropdownMenuTrigger as-child>
          <TogeButton variant="secondary" tone="neutral">Open menu</TogeButton>
        </TogeDropdownMenuTrigger>
        <TogeDropdownMenuContent>
          <TogeDropdownMenuItem>Profile</TogeDropdownMenuItem>
          <TogeDropdownMenuItem>Settings</TogeDropdownMenuItem>
          <TogeDropdownMenuItem variant="destructive">Sign out</TogeDropdownMenuItem>
        </TogeDropdownMenuContent>
      </TogeDropdownMenu>
    `,
  }),
}
