import { getLocalTimeZone, today } from '@internationalized/date'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TogeCalendar } from '.'

const meta = {
  title: 'Toge UI/Calendar',
  component: TogeCalendar,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeCalendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeCalendar,
    },
    setup() {
      return {
        defaultPlaceholder: today(getLocalTimeZone()),
      }
    },
    template: `
      <TogeCalendar :default-placeholder="defaultPlaceholder" />
    `,
  }),
}
