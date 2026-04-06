import type { CellContext, ColumnDef } from '@tanstack/vue-table'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import { TogeDataTable } from '.'

interface Payment {
  status: string
  email: string
  amount: string
}

const columns: ColumnDef<unknown, unknown>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }: CellContext<unknown, unknown>) =>
      h('div', { class: 'font-medium' }, row.getValue('amount') as string),
  },
]

const data: Payment[] = [
  {
    status: 'Paid',
    email: 'alex@sprout.ph',
    amount: '$250.00',
  },
  {
    status: 'Pending',
    email: 'sam@sprout.ph',
    amount: '$120.00',
  },
  {
    status: 'Failed',
    email: 'jamie@sprout.ph',
    amount: '$80.00',
  },
]

const meta: Meta = {
  title: 'Toge UI/Data Table',
  component: TogeDataTable,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: {
      TogeDataTable,
    },
    setup() {
      return {
        columns,
        data,
      }
    },
    template: `
      <TogeDataTable
        :columns="columns"
        :data="data"
        caption="Recent payment activity"
      />
    `,
  }),
}
