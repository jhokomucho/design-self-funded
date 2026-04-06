import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogePagination,
  TogePaginationContent,
  TogePaginationEllipsis,
  TogePaginationFirst,
  TogePaginationItem,
  TogePaginationLast,
  TogePaginationNext,
  TogePaginationPrevious,
} from '.'

const meta = {
  title: 'Toge UI/Pagination',
  component: TogePagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-pagination'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogePagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogePagination,
      TogePaginationContent,
      TogePaginationFirst,
      TogePaginationPrevious,
      TogePaginationItem,
      TogePaginationEllipsis,
      TogePaginationNext,
      TogePaginationLast,
    },
    template: `
      <TogePagination
        v-slot="{ page }"
        :items-per-page="10"
        :total="30"
        :default-page="2"
        show-edges
        class="w-auto max-w-full"
      >
        <TogePaginationContent
          v-slot="{ items }"
          class="flex flex-wrap items-center justify-center gap-1"
        >
          <TogePaginationFirst />
          <TogePaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <TogePaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </TogePaginationItem>
            <TogePaginationEllipsis v-else :index="index" />
          </template>
          <TogePaginationNext />
          <TogePaginationLast />
        </TogePaginationContent>
      </TogePagination>
    `,
  }),
} as unknown as Story
