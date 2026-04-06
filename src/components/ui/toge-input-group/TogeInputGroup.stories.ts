import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon } from '@iconify/vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeInputGroup, TogeInputGroupAddon, TogeInputGroupButton, TogeInputGroupInput } from '.'

const meta = {
  title: 'Toge UI/Input Group',
  component: TogeInputGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-input-group'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeInputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeInputGroup,
      TogeInputGroupAddon,
      TogeInputGroupInput,
      TogeInputGroupButton,
      Icon,
    },
    template: `
      <TogeInputGroup class="max-w-md">
        <TogeInputGroupAddon align="inline-start">
          <Icon icon="ph:magnifying-glass" class="size-4 text-muted-foreground" />
        </TogeInputGroupAddon>
        <TogeInputGroupInput placeholder="Search…" />
        <TogeInputGroupAddon align="inline-end">
          <TogeInputGroupButton variant="primary" tone="success" size="sm">Go</TogeInputGroupButton>
        </TogeInputGroupAddon>
      </TogeInputGroup>
    `,
  }),
}
