import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TogeResizableHandle, TogeResizablePanel, TogeResizablePanelGroup } from '.'

const meta: Meta = {
  title: 'Toge UI/Resizable',
  component: TogeResizablePanelGroup,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: {
      TogeResizableHandle,
      TogeResizablePanel,
      TogeResizablePanelGroup,
    },
    template: `
      <div class="h-[240px] rounded-lg border">
        <TogeResizablePanelGroup direction="horizontal">
          <TogeResizablePanel :default-size="30" class="p-4">
            Left panel
          </TogeResizablePanel>
          <TogeResizableHandle with-handle />
          <TogeResizablePanel :default-size="70" class="p-4">
            Right panel
          </TogeResizablePanel>
        </TogeResizablePanelGroup>
      </div>
    `,
  }),
}
