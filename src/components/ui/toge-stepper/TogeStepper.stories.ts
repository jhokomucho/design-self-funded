import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  TogeStepper,
  TogeStepperDescription,
  TogeStepperIndicator,
  TogeStepperItem,
  TogeStepperSeparator,
  TogeStepperTitle,
  TogeStepperTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Stepper',
  component: TogeStepper,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeStepper>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeStepper,
      TogeStepperDescription,
      TogeStepperIndicator,
      TogeStepperItem,
      TogeStepperSeparator,
      TogeStepperTitle,
      TogeStepperTrigger,
    },
    template: `
      <TogeStepper :default-value="2" class="items-start">
        <TogeStepperItem :step="1" class="flex-col">
          <TogeStepperTrigger>
            <TogeStepperIndicator>1</TogeStepperIndicator>
            <div>
              <TogeStepperTitle>Details</TogeStepperTitle>
              <TogeStepperDescription>Provide account details.</TogeStepperDescription>
            </div>
          </TogeStepperTrigger>
          <TogeStepperSeparator class="mt-2 h-px w-16" />
        </TogeStepperItem>
        <TogeStepperItem :step="2" class="flex-col">
          <TogeStepperTrigger>
            <TogeStepperIndicator>2</TogeStepperIndicator>
            <div>
              <TogeStepperTitle>Confirm</TogeStepperTitle>
              <TogeStepperDescription>Review and confirm the request.</TogeStepperDescription>
            </div>
          </TogeStepperTrigger>
          <TogeStepperSeparator class="mt-2 h-px w-16" />
        </TogeStepperItem>
        <TogeStepperItem :step="3" class="flex-col">
          <TogeStepperTrigger>
            <TogeStepperIndicator>3</TogeStepperIndicator>
            <div>
              <TogeStepperTitle>Complete</TogeStepperTitle>
              <TogeStepperDescription>Finish the workflow.</TogeStepperDescription>
            </div>
          </TogeStepperTrigger>
        </TogeStepperItem>
      </TogeStepper>
    `,
  }),
}
