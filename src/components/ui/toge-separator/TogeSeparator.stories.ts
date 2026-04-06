import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeSeparator } from '.'

const meta = {
  title: 'Toge UI/Separator',
  component: TogeSeparator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-separator'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeSeparator>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeSeparator },
    template: `
      <div class="flex w-64 flex-col gap-2">
        <span class="text-sm">Above</span>
        <TogeSeparator />
        <span class="text-sm">Below</span>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { TogeSeparator },
    template: `
      <div class="flex h-10 items-center gap-3">
        <span class="text-sm">Left</span>
        <TogeSeparator orientation="vertical" class="h-6" />
        <span class="text-sm">Right</span>
      </div>
    `,
  }),
}
