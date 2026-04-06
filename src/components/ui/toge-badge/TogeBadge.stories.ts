import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeBadge } from '.'

const meta = {
  title: 'Toge UI/Badge',
  component: TogeBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-badge'),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['fill', 'outline'],
    },
    tone: {
      control: 'select',
      options: ['success', 'pending', 'warning', 'danger', 'info', 'neutral', 'plain'],
    },
  },
} satisfies Meta<typeof TogeBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'fill', tone: 'neutral' },
  render: (args) => ({
    components: { TogeBadge },
    setup() {
      return { args }
    },
    template: '<TogeBadge v-bind="args">Badge</TogeBadge>',
  }),
}

export const AllFill: Story = {
  render: () => ({
    components: { TogeBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <TogeBadge variant="fill" tone="success">Success</TogeBadge>
        <TogeBadge variant="fill" tone="pending">Pending</TogeBadge>
        <TogeBadge variant="fill" tone="warning">Warning</TogeBadge>
        <TogeBadge variant="fill" tone="danger">Danger</TogeBadge>
        <TogeBadge variant="fill" tone="info">Info</TogeBadge>
        <TogeBadge variant="fill" tone="neutral">Neutral</TogeBadge>
        <TogeBadge variant="fill" tone="plain">Plain</TogeBadge>
      </div>
    `,
  }),
}

export const AllOutline: Story = {
  render: () => ({
    components: { TogeBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <TogeBadge variant="outline" tone="success">Success</TogeBadge>
        <TogeBadge variant="outline" tone="pending">Pending</TogeBadge>
        <TogeBadge variant="outline" tone="warning">Warning</TogeBadge>
        <TogeBadge variant="outline" tone="danger">Danger</TogeBadge>
        <TogeBadge variant="outline" tone="info">Info</TogeBadge>
        <TogeBadge variant="outline" tone="neutral">Neutral</TogeBadge>
        <TogeBadge variant="outline" tone="plain">Plain</TogeBadge>
      </div>
    `,
  }),
}
