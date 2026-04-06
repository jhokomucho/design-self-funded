import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TogeDatePicker } from '.'

const meta = {
  title: 'Toge UI/Date Picker',
  component: TogeDatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeDatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeDatePicker,
    },
    template: `
      <TogeDatePicker />
    `,
  }),
}
