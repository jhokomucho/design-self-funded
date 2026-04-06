import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { TogeButton } from '@/components/ui/toge-button'
import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeDrawer,
  TogeDrawerContent,
  TogeDrawerDescription,
  TogeDrawerFooter,
  TogeDrawerHeader,
  TogeDrawerTitle,
  TogeDrawerTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Drawer',
  component: TogeDrawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-drawer'),
      },
    },
  },
} satisfies Meta<typeof TogeDrawer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeButton,
      TogeDrawer,
      TogeDrawerContent,
      TogeDrawerDescription,
      TogeDrawerFooter,
      TogeDrawerHeader,
      TogeDrawerTitle,
      TogeDrawerTrigger,
    },
    template: `
      <TogeDrawer>
        <TogeDrawerTrigger as-child>
          <TogeButton variant="secondary" tone="neutral">Open Drawer</TogeButton>
        </TogeDrawerTrigger>
        <TogeDrawerContent>
          <TogeDrawerHeader>
            <TogeDrawerTitle>Share link</TogeDrawerTitle>
            <TogeDrawerDescription>
              Choose how you want to continue from this mobile-first panel.
            </TogeDrawerDescription>
          </TogeDrawerHeader>
          <TogeDrawerFooter>
            <TogeButton>Continue</TogeButton>
            <TogeButton variant="secondary" tone="neutral">Cancel</TogeButton>
          </TogeDrawerFooter>
        </TogeDrawerContent>
      </TogeDrawer>
    `,
  }),
}
