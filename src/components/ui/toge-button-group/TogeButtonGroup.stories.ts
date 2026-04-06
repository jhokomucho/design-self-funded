import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeButton } from '@/components/ui/toge-button'

import { TogeButtonGroup, TogeButtonGroupSeparator } from '.'

const meta = {
  title: 'Toge UI/Button Group',
  component: TogeButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-button-group'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeButtonGroup, TogeButtonGroupSeparator, TogeButton },
    template: `
      <TogeButtonGroup aria-label="Actions">
        <TogeButton variant="secondary" tone="neutral" size="medium">One</TogeButton>
        <TogeButtonGroupSeparator />
        <TogeButton variant="secondary" tone="neutral" size="medium">Two</TogeButton>
        <TogeButtonGroupSeparator />
        <TogeButton variant="secondary" tone="neutral" size="medium">Three</TogeButton>
      </TogeButtonGroup>
    `,
  }),
}
