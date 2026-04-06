import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeCard, TogeCardContent, TogeCardDescription, TogeCardHeader, TogeCardTitle } from '.'

const meta = {
  title: 'Toge UI/Card',
  component: TogeCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-card'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeCard,
      TogeCardHeader,
      TogeCardTitle,
      TogeCardDescription,
      TogeCardContent,
    },
    template: `
      <TogeCard class="max-w-md">
        <TogeCardHeader>
          <TogeCardTitle>Card title</TogeCardTitle>
          <TogeCardDescription>Optional description text.</TogeCardDescription>
        </TogeCardHeader>
        <TogeCardContent>
          <p class="text-sm text-muted-foreground">Card body content.</p>
        </TogeCardContent>
      </TogeCard>
    `,
  }),
}
