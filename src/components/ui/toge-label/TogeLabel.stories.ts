import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeInput } from '@/components/ui/toge-input'

import { TogeLabel } from '.'

const meta = {
  title: 'Toge UI/Label',
  component: TogeLabel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-label'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeLabel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeLabel, TogeInput },
    template: `
      <div class="w-72 space-y-2">
        <TogeLabel for="sb-label">Field label</TogeLabel>
        <TogeInput id="sb-label" placeholder="Associated input" />
      </div>
    `,
  }),
}
