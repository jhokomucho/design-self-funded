import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  TogeCommand,
  TogeCommandEmpty,
  TogeCommandGroup,
  TogeCommandInput,
  TogeCommandItem,
  TogeCommandList,
  TogeCommandSeparator,
  TogeCommandShortcut,
} from '.'

const meta = {
  title: 'Toge UI/Command',
  component: TogeCommand,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeCommand>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeCommand,
      TogeCommandEmpty,
      TogeCommandGroup,
      TogeCommandInput,
      TogeCommandItem,
      TogeCommandList,
      TogeCommandSeparator,
      TogeCommandShortcut,
    },
    template: `
      <div class="w-[320px] rounded-md border">
        <TogeCommand>
          <TogeCommandInput placeholder="Search..." aria-label="Search commands" />
          <TogeCommandList aria-label="Commands">
            <TogeCommandEmpty>No results found.</TogeCommandEmpty>
            <TogeCommandGroup heading="Suggestions">
              <TogeCommandItem value="calendar">
                Calendar
                <TogeCommandShortcut>⌘K</TogeCommandShortcut>
              </TogeCommandItem>
              <TogeCommandItem value="search-emoji">
                Search Emoji
              </TogeCommandItem>
            </TogeCommandGroup>
            <TogeCommandSeparator />
            <TogeCommandGroup heading="Settings">
              <TogeCommandItem value="profile">Profile</TogeCommandItem>
              <TogeCommandItem value="billing">Billing</TogeCommandItem>
            </TogeCommandGroup>
          </TogeCommandList>
        </TogeCommand>
      </div>
    `,
  }),
}
