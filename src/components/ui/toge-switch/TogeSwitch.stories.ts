import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeSwitch } from '.'

const meta = {
  title: 'Toge UI/Switch',
  component: TogeSwitch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-switch'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeSwitch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const on = ref(true)
    return {
      components: { TogeSwitch },
      setup() {
        return { on }
      },
      template: '<TogeSwitch v-model="on" aria-label="Toggle" />',
    }
  },
}
