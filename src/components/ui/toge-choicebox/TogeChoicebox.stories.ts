import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { uiInstallMarkdown } from '@/lib/storybook-install-docs'
import { TogeChoicebox, TogeChoiceboxDescription, TogeChoiceboxItem, TogeChoiceboxLabel } from '.'

const meta = {
  title: 'Toge UI/Choicebox',
  component: TogeChoicebox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-choicebox'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeChoicebox>

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: () => ({
    components: { TogeChoicebox, TogeChoiceboxItem, TogeChoiceboxLabel, TogeChoiceboxDescription },
    setup() {
      const selected = ref('pro')
      return { selected }
    },
    template: `
      <TogeChoicebox v-model="selected" aria-label="Select a plan" class="max-w-sm">
        <TogeChoiceboxItem value="starter">
          <TogeChoiceboxLabel>Starter</TogeChoiceboxLabel>
          <TogeChoiceboxDescription>For individuals and small teams getting started.</TogeChoiceboxDescription>
        </TogeChoiceboxItem>
        <TogeChoiceboxItem value="pro">
          <TogeChoiceboxLabel>Pro</TogeChoiceboxLabel>
          <TogeChoiceboxDescription>For growing teams with advanced collaboration needs.</TogeChoiceboxDescription>
        </TogeChoiceboxItem>
        <TogeChoiceboxItem value="enterprise">
          <TogeChoiceboxLabel>Enterprise</TogeChoiceboxLabel>
          <TogeChoiceboxDescription>Custom solutions for large organisations at scale.</TogeChoiceboxDescription>
        </TogeChoiceboxItem>
      </TogeChoicebox>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { TogeChoicebox, TogeChoiceboxItem, TogeChoiceboxLabel, TogeChoiceboxDescription },
    setup() {
      const selected = ref(['analytics'])
      return { selected }
    },
    template: `
      <TogeChoicebox v-model="selected" multiple aria-label="Select features" class="max-w-sm">
        <TogeChoiceboxItem value="analytics">
          <TogeChoiceboxLabel>Analytics</TogeChoiceboxLabel>
          <TogeChoiceboxDescription>Track usage, performance, and user behaviour.</TogeChoiceboxDescription>
        </TogeChoiceboxItem>
        <TogeChoiceboxItem value="notifications">
          <TogeChoiceboxLabel>Notifications</TogeChoiceboxLabel>
          <TogeChoiceboxDescription>Receive alerts for critical events in real time.</TogeChoiceboxDescription>
        </TogeChoiceboxItem>
        <TogeChoiceboxItem value="api-access">
          <TogeChoiceboxLabel>API Access</TogeChoiceboxLabel>
          <TogeChoiceboxDescription>Integrate with your own tools via REST API.</TogeChoiceboxDescription>
        </TogeChoiceboxItem>
        <TogeChoiceboxItem value="sso" disabled>
          <TogeChoiceboxLabel>Single Sign-On</TogeChoiceboxLabel>
          <TogeChoiceboxDescription>Enterprise SSO — available on Enterprise plan only.</TogeChoiceboxDescription>
        </TogeChoiceboxItem>
      </TogeChoicebox>
    `,
  }),
}
