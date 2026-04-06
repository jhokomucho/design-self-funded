import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon } from '@iconify/vue'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeButton } from '@/components/ui/toge-button'

import {
  TogeDialog,
  TogeDialogBody,
  TogeDialogContent,
  TogeDialogDescription,
  TogeDialogHeader,
  TogeDialogTitle,
  TogeDialogTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Dialog',
  component: TogeDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-dialog'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeDialog,
      TogeDialogTrigger,
      TogeDialogContent,
      TogeDialogHeader,
      TogeDialogTitle,
      TogeDialogDescription,
      TogeDialogBody,
      TogeButton,
      Icon,
    },
    template: `
      <TogeDialog>
        <TogeDialogTrigger as-child>
          <TogeButton variant="secondary" tone="neutral">
            <Icon icon="ph:chat-circle" class="size-4" />
            Open dialog
          </TogeButton>
        </TogeDialogTrigger>
        <TogeDialogContent>
          <TogeDialogHeader>
            <TogeDialogTitle>Dialog title</TogeDialogTitle>
            <TogeDialogDescription>
              Supporting description for this dialog.
            </TogeDialogDescription>
          </TogeDialogHeader>
          <TogeDialogBody>
            <div class="rounded-md border p-4 text-sm text-muted-foreground">
              Place dialog content here.
            </div>
          </TogeDialogBody>
        </TogeDialogContent>
      </TogeDialog>
    `,
  }),
}
