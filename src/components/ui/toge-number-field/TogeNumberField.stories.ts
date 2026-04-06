import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  TogeNumberField,
  TogeNumberFieldContent,
  TogeNumberFieldDecrement,
  TogeNumberFieldIncrement,
  TogeNumberFieldInput,
} from '.'

const meta = {
  title: 'Toge UI/Number Field',
  component: TogeNumberField,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeNumberField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeNumberField,
      TogeNumberFieldContent,
      TogeNumberFieldDecrement,
      TogeNumberFieldIncrement,
      TogeNumberFieldInput,
    },
    template: `
      <div class="w-40">
        <TogeNumberField :default-value="2" :min="0" :max="10">
          <TogeNumberFieldContent>
            <TogeNumberFieldDecrement />
            <TogeNumberFieldInput aria-label="Quantity" />
            <TogeNumberFieldIncrement />
          </TogeNumberFieldContent>
        </TogeNumberField>
      </div>
    `,
  }),
}
