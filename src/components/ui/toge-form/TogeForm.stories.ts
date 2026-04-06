import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TogeButton } from '@/components/ui/toge-button'
import { TogeInput } from '@/components/ui/toge-input'
import {
  TogeForm,
  TogeFormControl,
  TogeFormDescription,
  TogeFormField,
  TogeFormItem,
  TogeFormLabel,
  TogeFormMessage,
} from '.'

const meta = {
  title: 'Toge UI/Form',
  component: TogeForm,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeButton,
      TogeForm,
      TogeFormControl,
      TogeFormDescription,
      TogeFormField,
      TogeFormItem,
      TogeFormLabel,
      TogeFormMessage,
      TogeInput,
    },
    template: `
      <TogeForm class="grid gap-6">
        <TogeFormField
          name="email"
          :rules="(value) => value ? true : 'Email is required'"
          v-slot="{ componentField }"
        >
          <TogeFormItem class="max-w-sm">
            <TogeFormLabel>Email</TogeFormLabel>
            <TogeFormControl>
              <TogeInput placeholder="name@sprout.ph" v-bind="componentField" />
            </TogeFormControl>
            <TogeFormDescription>Use your work email address.</TogeFormDescription>
            <TogeFormMessage />
          </TogeFormItem>
        </TogeFormField>
        <TogeButton type="submit" class="w-fit">Submit</TogeButton>
      </TogeForm>
    `,
  }),
}
