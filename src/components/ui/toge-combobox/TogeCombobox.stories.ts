import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon } from '@iconify/vue'
import {
  TogeCombobox,
  TogeComboboxAnchor,
  TogeComboboxContent,
  TogeComboboxEmpty,
  TogeComboboxGroup,
  TogeComboboxInput,
  TogeComboboxItem,
  TogeComboboxItemIndicator,
  TogeComboboxTrigger,
  TogeComboboxViewport,
} from '.'

const meta = {
  title: 'Toge UI/Combobox',
  component: TogeCombobox,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeCombobox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // aria-controls is managed internally by Reka UI — empty at portal mount time
            id: 'aria-required-attr',
            selector: ':not([data-slot="combobox-input"])',
          },
        ],
      },
    },
  },
  render: () => ({
    components: {
      Icon,
      TogeCombobox,
      TogeComboboxAnchor,
      TogeComboboxContent,
      TogeComboboxEmpty,
      TogeComboboxGroup,
      TogeComboboxInput,
      TogeComboboxItem,
      TogeComboboxItemIndicator,
      TogeComboboxTrigger,
      TogeComboboxViewport,
    },
    template: `
      <TogeCombobox :open="true">
        <TogeComboboxAnchor class="w-[280px]">
          <TogeComboboxInput placeholder="Select framework..." aria-label="Select framework" />
          <TogeComboboxTrigger class="px-3">
            <Icon icon="lucide:chevrons-up-down" class="h-4 w-4 opacity-50" />
          </TogeComboboxTrigger>
        </TogeComboboxAnchor>
        <TogeComboboxContent class="w-[280px]" aria-label="Frameworks">
          <TogeComboboxViewport>
            <TogeComboboxEmpty>No framework found.</TogeComboboxEmpty>
            <TogeComboboxGroup heading="Frameworks">
              <TogeComboboxItem value="vue">
                Vue
                <TogeComboboxItemIndicator>Selected</TogeComboboxItemIndicator>
              </TogeComboboxItem>
              <TogeComboboxItem value="nuxt">Nuxt</TogeComboboxItem>
            </TogeComboboxGroup>
          </TogeComboboxViewport>
        </TogeComboboxContent>
      </TogeCombobox>
    `,
  }),
}
