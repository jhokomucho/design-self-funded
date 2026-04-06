import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TogePinInput, TogePinInputGroup, TogePinInputSeparator, TogePinInputSlot } from '.'

const meta: Meta = {
  title: 'Toge UI/Pin Input',
  component: TogePinInput as never,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogePinInput,
      TogePinInputGroup,
      TogePinInputSeparator,
      TogePinInputSlot,
    },
    template: `
      <TogePinInput :default-value="['1', '2', '3', '4']">
        <TogePinInputGroup>
          <TogePinInputSlot :index="0" />
          <TogePinInputSlot :index="1" />
        </TogePinInputGroup>
        <TogePinInputSeparator />
        <TogePinInputGroup>
          <TogePinInputSlot :index="2" />
          <TogePinInputSlot :index="3" />
        </TogePinInputGroup>
      </TogePinInput>
    `,
  }),
}
