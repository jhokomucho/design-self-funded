import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeToggle } from '.'

const meta = {
  title: 'Toge UI/Toggle',
  component: TogeToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-toggle'),
      },
    },
  },
} satisfies Meta<typeof TogeToggle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'secondary',
    tone: 'neutral',
    size: 'medium',
  },
  render: (args) => ({
    components: { TogeToggle },
    setup() {
      return { args }
    },
    template: '<TogeToggle v-bind="args">Bold</TogeToggle>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    tone: 'neutral',
    size: 'medium',
  },
  render: (args) => ({
    components: { TogeToggle },
    setup() {
      return { args }
    },
    template: '<TogeToggle v-bind="args">Italic</TogeToggle>',
  }),
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    tone: 'success',
    size: 'medium',
  },
  render: (args) => ({
    components: { TogeToggle },
    setup() {
      return { args }
    },
    template: '<TogeToggle v-bind="args">Subscribe</TogeToggle>',
  }),
}
