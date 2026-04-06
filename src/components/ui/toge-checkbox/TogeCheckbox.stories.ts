import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeLabel } from '@/components/ui/toge-label'

import { TogeCheckbox } from '.'

const meta = {
  title: 'Toge UI/Checkbox',
  component: TogeCheckbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-checkbox'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeCheckbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const checked = ref(false)
    return {
      components: { TogeCheckbox, TogeLabel },
      setup() {
        return { checked }
      },
      template: `
        <div class="flex items-center gap-2">
          <TogeCheckbox id="sb-cb" v-model="checked" />
          <TogeLabel for="sb-cb">Accept terms</TogeLabel>
        </div>
      `,
    }
  },
}
