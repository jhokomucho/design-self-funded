import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeCollapsible, TogeCollapsibleContent, TogeCollapsibleTrigger } from '.'

const meta = {
  title: 'Toge UI/Collapsible',
  component: TogeCollapsible,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-collapsible'),
      },
    },
  },
} satisfies Meta<typeof TogeCollapsible>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeCollapsible,
      TogeCollapsibleContent,
      TogeCollapsibleTrigger,
    },
    template: `
      <TogeCollapsible class="w-[320px]" :default-open="true">
        <div class="flex items-center justify-between gap-4 rounded-md border p-4">
          <div class="space-y-1">
            <p class="text-sm font-medium">Collapsible item</p>
            <p class="text-muted-foreground text-sm">Toggle the extra content below.</p>
          </div>
          <TogeCollapsibleTrigger class="underline">Toggle</TogeCollapsibleTrigger>
        </div>
        <TogeCollapsibleContent class="rounded-b-md border border-t-0 p-4">
          Hidden content that expands in place.
        </TogeCollapsibleContent>
      </TogeCollapsible>
    `,
  }),
}
