import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon } from '@iconify/vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeAlert, TogeAlertDescription, TogeAlertTitle } from '.'

const meta = {
  title: 'Toge UI/Alert',
  component: TogeAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-alert'),
      },
    },
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'info', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof TogeAlert>

export default meta

type Story = StoryObj<typeof meta>

const iconMap: Record<string, string> = {
  default: 'ph:info-fill',
  success: 'ph:check-circle-fill',
  info: 'ph:info-fill',
  warning: 'ph:warning-fill',
  error: 'ph:x-circle-fill',
}

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { TogeAlert, TogeAlertTitle, TogeAlertDescription, Icon },
    setup() {
      return { args, iconMap }
    },
    template: `
      <TogeAlert v-bind="args" class="max-w-md">
        <Icon :icon="iconMap[args.variant ?? 'default']" class="size-5" />
        <TogeAlertTitle>Heads up</TogeAlertTitle>
        <TogeAlertDescription>
          Short supporting copy for the alert.
        </TogeAlertDescription>
      </TogeAlert>
    `,
  }),
}

export const Success: Story = {
  render: () => ({
    components: { TogeAlert, TogeAlertTitle, TogeAlertDescription, Icon },
    template: `
      <TogeAlert variant="success" class="max-w-md">
        <Icon icon="ph:check-circle-fill" class="size-5" />
        <TogeAlertTitle>Success</TogeAlertTitle>
        <TogeAlertDescription>
          Your changes have been saved successfully.
        </TogeAlertDescription>
      </TogeAlert>
    `,
  }),
}

export const Info: Story = {
  render: () => ({
    components: { TogeAlert, TogeAlertTitle, TogeAlertDescription, Icon },
    template: `
      <TogeAlert variant="info" class="max-w-md">
        <Icon icon="ph:info-fill" class="size-5" />
        <TogeAlertTitle>Information</TogeAlertTitle>
        <TogeAlertDescription>
          This action will affect all users in your organization.
        </TogeAlertDescription>
      </TogeAlert>
    `,
  }),
}

export const Warning: Story = {
  render: () => ({
    components: { TogeAlert, TogeAlertTitle, TogeAlertDescription, Icon },
    template: `
      <TogeAlert variant="warning" class="max-w-md">
        <Icon icon="ph:warning-fill" class="size-5" />
        <TogeAlertTitle>Warning</TogeAlertTitle>
        <TogeAlertDescription>
          Your subscription is about to expire. Please renew to avoid interruption.
        </TogeAlertDescription>
      </TogeAlert>
    `,
  }),
}

export const Error: Story = {
  render: () => ({
    components: { TogeAlert, TogeAlertTitle, TogeAlertDescription, Icon },
    template: `
      <TogeAlert variant="error" class="max-w-md">
        <Icon icon="ph:x-circle-fill" class="size-5" />
        <TogeAlertTitle>Error</TogeAlertTitle>
        <TogeAlertDescription>
          Something went wrong. Please try again or contact support.
        </TogeAlertDescription>
      </TogeAlert>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { TogeAlert, TogeAlertTitle, TogeAlertDescription, Icon },
    template: `
      <div class="flex flex-col gap-3 max-w-md">
        <TogeAlert variant="success">
          <Icon icon="ph:check-circle-fill" class="size-5" />
          <TogeAlertTitle>Success</TogeAlertTitle>
          <TogeAlertDescription>Your changes have been saved successfully.</TogeAlertDescription>
        </TogeAlert>
        <TogeAlert variant="info">
          <Icon icon="ph:info-fill" class="size-5" />
          <TogeAlertTitle>Information</TogeAlertTitle>
          <TogeAlertDescription>This action will affect all users in your organization.</TogeAlertDescription>
        </TogeAlert>
        <TogeAlert variant="warning">
          <Icon icon="ph:warning-fill" class="size-5" />
          <TogeAlertTitle>Warning</TogeAlertTitle>
          <TogeAlertDescription>Your subscription is about to expire.</TogeAlertDescription>
        </TogeAlert>
        <TogeAlert variant="error">
          <Icon icon="ph:x-circle-fill" class="size-5" />
          <TogeAlertTitle>Error</TogeAlertTitle>
          <TogeAlertDescription>Something went wrong. Please try again or contact support.</TogeAlertDescription>
        </TogeAlert>
      </div>
    `,
  }),
}
