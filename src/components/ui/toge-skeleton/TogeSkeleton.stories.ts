import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeSkeleton } from '.'

const meta = {
  title: 'Toge UI/Skeleton',
  component: TogeSkeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-skeleton'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeSkeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeSkeleton },
    template: `
      <div class="flex w-64 flex-col gap-2">
        <TogeSkeleton class="h-4 w-3/4" />
        <TogeSkeleton class="h-4 w-1/2" />
        <TogeSkeleton class="h-24 w-full" />
      </div>
    `,
  }),
}
