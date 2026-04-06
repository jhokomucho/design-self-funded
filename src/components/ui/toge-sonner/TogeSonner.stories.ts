import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TogeButton } from '@/components/ui/toge-button'
import { TogeSonner, toast } from '.'

const meta = {
  title: 'Toge UI/Sonner',
  component: TogeSonner,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeSonner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => ({
    components: {
      TogeButton,
      TogeSonner,
    },
    setup() {
      return {
        showSuccess: () => toast.success('Profile updated successfully.'),
        showError: () => toast.error('Something went wrong.'),
        showWarning: () => toast.warning('Please review before continuing.'),
        showInfo: () => toast.info('New update available.'),
      }
    },
    template: `
      <div class="flex flex-wrap gap-3 p-8">
        <TogeButton tone="success" @click="showSuccess">Success</TogeButton>
        <TogeButton tone="danger" @click="showError">Error</TogeButton>
        <TogeButton variant="secondary" tone="neutral" @click="showWarning">Warning</TogeButton>
        <TogeButton variant="tertiary" tone="neutral" @click="showInfo">Info</TogeButton>
        <TogeSonner position="bottom-right" />
      </div>
    `,
  }),
}
