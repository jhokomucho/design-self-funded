import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeScrollArea } from '.'

const meta = {
  title: 'Toge UI/Scroll Area',
  component: TogeScrollArea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-scroll-area'),
      },
    },
  },
} satisfies Meta<typeof TogeScrollArea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeScrollArea },
    template: `
      <TogeScrollArea class="h-56 w-72 rounded-md border">
        <div class="space-y-3 p-4">
          <p v-for="item in 20" :key="item" class="text-sm">
            Scroll area item {{ item }}
          </p>
        </div>
      </TogeScrollArea>
    `,
  }),
}
