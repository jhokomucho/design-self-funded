import { getLocalTimeZone, today } from '@internationalized/date'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { DateRange } from 'reka-ui'
import { ref } from 'vue'
import { TogeRangeCalendar } from '.'

const meta = {
  title: 'Toge UI/Range Calendar',
  component: TogeRangeCalendar,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeRangeCalendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeRangeCalendar,
    },
    setup() {
      const start = today(getLocalTimeZone())
      const end = start.add({ days: 7 })
      const dateRange = ref<DateRange>({
        start,
        end,
      })

      return {
        dateRange,
        start,
      }
    },
    template: `
      <TogeRangeCalendar
        v-model="dateRange"
        :default-placeholder="start"
        :number-of-months="2"
        disable-days-outside-current-view
      />
    `,
  }),
}
