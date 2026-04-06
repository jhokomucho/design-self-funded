import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeBadge } from '@/components/ui/toge-badge'

import {
  TogeTable,
  TogeTableBody,
  TogeTableCell,
  TogeTableHead,
  TogeTableHeader,
  TogeTableRow,
} from '.'

const meta = {
  title: 'Toge UI/Table',
  component: TogeTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-table'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeTable,
      TogeTableHeader,
      TogeTableBody,
      TogeTableRow,
      TogeTableHead,
      TogeTableCell,
      TogeBadge,
    },
    template: `
      <div class="max-w-xl rounded-md border border-weak overflow-hidden">
        <TogeTable>
          <TogeTableHeader>
            <TogeTableRow>
              <TogeTableHead>Name</TogeTableHead>
              <TogeTableHead>Status</TogeTableHead>
              <TogeTableHead class="text-right">Qty</TogeTableHead>
            </TogeTableRow>
          </TogeTableHeader>
          <TogeTableBody>
            <TogeTableRow>
              <TogeTableCell>Alpha</TogeTableCell>
              <TogeTableCell>
                <TogeBadge>Ready</TogeBadge>
              </TogeTableCell>
              <TogeTableCell class="text-right">3</TogeTableCell>
            </TogeTableRow>
            <TogeTableRow>
              <TogeTableCell>Beta</TogeTableCell>
              <TogeTableCell>Draft</TogeTableCell>
              <TogeTableCell class="text-right">1</TogeTableCell>
            </TogeTableRow>
          </TogeTableBody>
        </TogeTable>
      </div>
    `,
  }),
}
