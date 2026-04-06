import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { TogeButton } from '@/components/ui/toge-button'
import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeSheet,
  TogeSheetBody,
  TogeSheetContent,
  TogeSheetDescription,
  TogeSheetFooter,
  TogeSheetHeader,
  TogeSheetTitle,
  TogeSheetTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Sheet',
  component: TogeSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-sheet'),
      },
    },
  },
} satisfies Meta<typeof TogeSheet>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeButton,
      TogeSheet,
      TogeSheetBody,
      TogeSheetContent,
      TogeSheetDescription,
      TogeSheetFooter,
      TogeSheetHeader,
      TogeSheetTitle,
      TogeSheetTrigger,
    },
    template: `
      <TogeSheet>
        <TogeSheetTrigger as-child>
          <TogeButton variant="secondary" tone="neutral">Open Sheet</TogeButton>
        </TogeSheetTrigger>
        <TogeSheetContent>
          <TogeSheetHeader>
            <TogeSheetTitle>Edit profile</TogeSheetTitle>
            <TogeSheetDescription>
              Make changes to your profile here. Click save when you're done.
            </TogeSheetDescription>
          </TogeSheetHeader>
          <TogeSheetBody>
            <div class="rounded-md border p-4 text-sm text-muted-foreground">
              Place form content here.
            </div>
          </TogeSheetBody>
          <TogeSheetFooter :show-close-button="true">
            <TogeButton>Save changes</TogeButton>
          </TogeSheetFooter>
        </TogeSheetContent>
      </TogeSheet>
    `,
  }),
}
