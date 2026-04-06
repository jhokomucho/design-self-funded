import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeLabel } from '@/components/ui/toge-label'

import { TogeInput } from '.'

const meta = {
  title: 'Toge UI/Input',
  component: TogeInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-input'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeInput, TogeLabel },
    template: `
      <div class="w-72 space-y-2">
        <TogeLabel for="sb-input">Label</TogeLabel>
        <TogeInput id="sb-input" placeholder="Type here" />
      </div>
    `,
  }),
}
