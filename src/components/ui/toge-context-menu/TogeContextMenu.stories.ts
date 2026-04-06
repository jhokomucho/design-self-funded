import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeContextMenu,
  TogeContextMenuContent,
  TogeContextMenuItem,
  TogeContextMenuTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Context Menu',
  component: TogeContextMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-context-menu'),
      },
    },
  },
} satisfies Meta<typeof TogeContextMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeContextMenu,
      TogeContextMenuContent,
      TogeContextMenuItem,
      TogeContextMenuTrigger,
    },
    template: `
      <TogeContextMenu>
        <TogeContextMenuTrigger class="flex h-32 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right click here
        </TogeContextMenuTrigger>
        <TogeContextMenuContent force-mount>
          <TogeContextMenuItem>Copy</TogeContextMenuItem>
          <TogeContextMenuItem>Duplicate</TogeContextMenuItem>
          <TogeContextMenuItem variant="destructive">Delete</TogeContextMenuItem>
        </TogeContextMenuContent>
      </TogeContextMenu>
    `,
  }),
}
