import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeSlider } from '.'

const meta = {
  title: 'Toge UI/Slider',
  component: TogeSlider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-slider'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeSlider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const value = ref([40])
    return {
      components: { TogeSlider },
      setup() {
        return { value }
      },
      template: '<div class="w-64"><TogeSlider v-model="value" :max="100" :step="1" /></div>',
    }
  },
}
