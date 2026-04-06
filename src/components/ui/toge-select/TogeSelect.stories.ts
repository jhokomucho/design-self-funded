import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeLabel } from '@/components/ui/toge-label'

import {
  TogeSelect,
  TogeSelectContent,
  TogeSelectItem,
  TogeSelectTrigger,
  TogeSelectValue,
} from '.'

const meta = {
  title: 'Toge UI/Select',
  component: TogeSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-select'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeSelect,
      TogeSelectTrigger,
      TogeSelectValue,
      TogeSelectContent,
      TogeSelectItem,
      TogeLabel,
    },
    template: `
      <div class="w-64 space-y-2">
        <TogeLabel for="sb-select">Choose</TogeLabel>
        <TogeSelect default-value="a">
          <TogeSelectTrigger id="sb-select" class="w-full">
            <TogeSelectValue placeholder="Select…" />
          </TogeSelectTrigger>
          <TogeSelectContent>
            <TogeSelectItem value="a">Alpha</TogeSelectItem>
            <TogeSelectItem value="b">Beta</TogeSelectItem>
            <TogeSelectItem value="c">Gamma</TogeSelectItem>
          </TogeSelectContent>
        </TogeSelect>
      </div>
    `,
  }),
}
