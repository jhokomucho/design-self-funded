import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeLabel } from '@/components/ui/toge-label'

import { TogeNativeSelect, TogeNativeSelectOptGroup, TogeNativeSelectOption } from '.'

const meta = {
  title: 'Toge UI/Native Select',
  component: TogeNativeSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-native-select'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeNativeSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { TogeNativeSelect, TogeNativeSelectOptGroup, TogeNativeSelectOption, TogeLabel },
    template: `
      <div class="flex flex-col gap-2">
        <TogeLabel for="sb-native-select">Choose a fruit</TogeLabel>
        <TogeNativeSelect id="sb-native-select">
          <TogeNativeSelectOption value="">Select…</TogeNativeSelectOption>
          <TogeNativeSelectOptGroup label="Tropical">
            <TogeNativeSelectOption value="mango">Mango</TogeNativeSelectOption>
            <TogeNativeSelectOption value="pineapple">Pineapple</TogeNativeSelectOption>
          </TogeNativeSelectOptGroup>
          <TogeNativeSelectOptGroup label="Temperate">
            <TogeNativeSelectOption value="apple">Apple</TogeNativeSelectOption>
            <TogeNativeSelectOption value="pear">Pear</TogeNativeSelectOption>
          </TogeNativeSelectOptGroup>
        </TogeNativeSelect>
      </div>
    `,
  }),
}
