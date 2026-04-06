import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeProgress } from '.'

const meta = {
  title: 'Toge UI/Progress',
  component: TogeProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-progress'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: 45,
  },
  render: (args) => ({
    components: { TogeProgress },
    setup() {
      return { args }
    },
    template: '<div class="w-64"><TogeProgress v-bind="args" /></div>',
  }),
}
