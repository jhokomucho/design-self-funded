import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeLabel } from '@/components/ui/toge-label'

import { TogeTextarea } from '.'

const meta = {
  title: 'Toge UI/Textarea',
  component: TogeTextarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-textarea'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeTextarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeTextarea, TogeLabel },
    template: `
      <div class="w-96 space-y-2">
        <TogeLabel for="sb-ta">Notes</TogeLabel>
        <TogeTextarea id="sb-ta" placeholder="Write something…" class="min-h-24" />
      </div>
    `,
  }),
}
