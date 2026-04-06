import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeLabel } from '@/components/ui/toge-label'

import { TogeRadioGroup, TogeRadioGroupItem } from '.'

const meta = {
  title: 'Toge UI/Radio Group',
  component: TogeRadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-radio-group'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeRadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const value = ref('a')
    return {
      components: { TogeRadioGroup, TogeRadioGroupItem, TogeLabel },
      setup() {
        return { value }
      },
      template: `
        <TogeRadioGroup v-model="value" class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <TogeRadioGroupItem id="rg-a" value="a" />
            <TogeLabel for="rg-a">Option A</TogeLabel>
          </div>
          <div class="flex items-center gap-2">
            <TogeRadioGroupItem id="rg-b" value="b" />
            <TogeLabel for="rg-b">Option B</TogeLabel>
          </div>
        </TogeRadioGroup>
      `,
    }
  },
}
