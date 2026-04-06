import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TogeCard, TogeCardContent } from '@/components/ui/toge-card'
import {
  TogeCarousel,
  TogeCarouselContent,
  TogeCarouselItem,
  TogeCarouselNext,
  TogeCarouselPrevious,
} from '.'

const meta = {
  title: 'Toge UI/Carousel',
  component: TogeCarousel,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeCarousel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeCard,
      TogeCardContent,
      TogeCarousel,
      TogeCarouselContent,
      TogeCarouselItem,
      TogeCarouselNext,
      TogeCarouselPrevious,
    },
    template: `
      <div class="mx-12 max-w-xs">
        <TogeCarousel>
          <TogeCarouselContent>
            <TogeCarouselItem v-for="item in 3" :key="item">
              <TogeCard>
                <TogeCardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-4xl font-semibold">{{ item }}</span>
                </TogeCardContent>
              </TogeCard>
            </TogeCarouselItem>
          </TogeCarouselContent>
          <TogeCarouselPrevious />
          <TogeCarouselNext />
        </TogeCarousel>
      </div>
    `,
  }),
}
