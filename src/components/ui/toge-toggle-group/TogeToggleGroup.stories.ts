import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeToggleGroup, TogeToggleGroupItem } from '.'

const meta = {
  title: 'Toge UI/Toggle Group',
  component: TogeToggleGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-toggle-group'),
      },
    },
  },
} satisfies Meta<typeof TogeToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeToggleGroup,
      TogeToggleGroupItem,
    },
    template: `
      <TogeToggleGroup type="single" default-value="left" variant="secondary" tone="neutral">
        <TogeToggleGroupItem value="left">Left</TogeToggleGroupItem>
        <TogeToggleGroupItem value="center">Center</TogeToggleGroupItem>
        <TogeToggleGroupItem value="right">Right</TogeToggleGroupItem>
      </TogeToggleGroup>
    `,
  }),
}
