import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeAvatar, TogeAvatarFallback } from '.'

const meta = {
  title: 'Toge UI/Avatar',
  component: TogeAvatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-avatar'),
      },
    },
  },
} satisfies Meta<typeof TogeAvatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeAvatar, TogeAvatarFallback },
    template: `
      <TogeAvatar>
        <TogeAvatarFallback>TG</TogeAvatarFallback>
      </TogeAvatar>
    `,
  }),
}
