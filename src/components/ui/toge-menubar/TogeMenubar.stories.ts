import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeMenubar,
  TogeMenubarContent,
  TogeMenubarItem,
  TogeMenubarMenu,
  TogeMenubarTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Menubar',
  component: TogeMenubar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-menubar'),
      },
    },
  },
} satisfies Meta<typeof TogeMenubar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeMenubar,
      TogeMenubarContent,
      TogeMenubarItem,
      TogeMenubarMenu,
      TogeMenubarTrigger,
    },
    template: `
      <TogeMenubar>
        <TogeMenubarMenu>
          <TogeMenubarTrigger>File</TogeMenubarTrigger>
          <TogeMenubarContent force-mount>
            <TogeMenubarItem>New Tab</TogeMenubarItem>
            <TogeMenubarItem>Save</TogeMenubarItem>
          </TogeMenubarContent>
        </TogeMenubarMenu>
      </TogeMenubar>
    `,
  }),
}
