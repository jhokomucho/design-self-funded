import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeAspectRatio } from '.'

const meta = {
  title: 'Toge UI/Aspect Ratio',
  component: TogeAspectRatio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-aspect-ratio'),
      },
    },
  },
} satisfies Meta<typeof TogeAspectRatio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeAspectRatio },
    template: `
      <div class="w-[320px]">
        <TogeAspectRatio :ratio="16 / 9">
          <div class="flex h-full items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
            16 / 9
          </div>
        </TogeAspectRatio>
      </div>
    `,
  }),
}
