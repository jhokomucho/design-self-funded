import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { TogeButton } from '@/components/ui/toge-button'
import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeAlertDialog,
  TogeAlertDialogAction,
  TogeAlertDialogCancel,
  TogeAlertDialogContent,
  TogeAlertDialogDescription,
  TogeAlertDialogFooter,
  TogeAlertDialogHeader,
  TogeAlertDialogTitle,
  TogeAlertDialogTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Alert Dialog',
  component: TogeAlertDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-alert-dialog'),
      },
    },
  },
} satisfies Meta<typeof TogeAlertDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeAlertDialog,
      TogeAlertDialogAction,
      TogeAlertDialogCancel,
      TogeAlertDialogContent,
      TogeAlertDialogDescription,
      TogeAlertDialogFooter,
      TogeAlertDialogHeader,
      TogeAlertDialogTitle,
      TogeAlertDialogTrigger,
      TogeButton,
    },
    template: `
      <TogeAlertDialog>
        <TogeAlertDialogTrigger as-child>
          <TogeButton variant="secondary" tone="danger">Delete item</TogeButton>
        </TogeAlertDialogTrigger>
        <TogeAlertDialogContent>
          <TogeAlertDialogHeader>
            <TogeAlertDialogTitle>Are you absolutely sure?</TogeAlertDialogTitle>
            <TogeAlertDialogDescription>
              This action cannot be undone. This will permanently delete the item.
            </TogeAlertDialogDescription>
          </TogeAlertDialogHeader>
          <TogeAlertDialogFooter>
            <TogeAlertDialogCancel>Cancel</TogeAlertDialogCancel>
            <TogeAlertDialogAction tone="danger">Continue</TogeAlertDialogAction>
          </TogeAlertDialogFooter>
        </TogeAlertDialogContent>
      </TogeAlertDialog>
    `,
  }),
}
