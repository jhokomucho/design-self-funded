import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { TogeAvatar, TogeAvatarFallback } from '@/components/ui/toge-avatar'
import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeHoverCard, TogeHoverCardContent, TogeHoverCardTrigger } from '.'

const meta = {
  title: 'Toge UI/Hover Card',
  component: TogeHoverCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-hover-card'),
      },
    },
  },
} satisfies Meta<typeof TogeHoverCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeAvatar,
      TogeAvatarFallback,
      TogeHoverCard,
      TogeHoverCardContent,
      TogeHoverCardTrigger,
    },
    template: `
      <div class="flex justify-center p-8">
        <TogeHoverCard :open-delay="100">
          <TogeHoverCardTrigger class="text-primary text-sm underline underline-offset-4">
            @toge
          </TogeHoverCardTrigger>
          <TogeHoverCardContent class="w-80">
            <div class="flex gap-4">
              <TogeAvatar>
                <TogeAvatarFallback>TD</TogeAvatarFallback>
              </TogeAvatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">Toge Design System</h4>
                <p class="text-muted-foreground text-sm">
                  Shared UI primitives for Sprout apps built on shadcn-vue patterns.
                </p>
              </div>
            </div>
          </TogeHoverCardContent>
        </TogeHoverCard>
      </div>
    `,
  }),
}
