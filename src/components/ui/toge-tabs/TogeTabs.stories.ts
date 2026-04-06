import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeTabs, TogeTabsContent, TogeTabsList, TogeTabsTrigger } from '.'

const meta = {
  title: 'Toge UI/Tabs',
  component: TogeTabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-tabs'),
      },
    },
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['button', 'underline'],
      description: 'Visual style of the tab list',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
  },
  args: {
    variant: 'button',
  },
} satisfies Meta<typeof TogeTabsList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { TogeTabs, TogeTabsList, TogeTabsTrigger, TogeTabsContent },
    setup() {
      return { args }
    },
    template: `
      <TogeTabs default-value="tab1">
        <TogeTabsList :variant="args.variant">
          <TogeTabsTrigger value="tab1">Overview</TogeTabsTrigger>
          <TogeTabsTrigger value="tab2">Analytics</TogeTabsTrigger>
          <TogeTabsTrigger value="tab3">Reports</TogeTabsTrigger>
          <TogeTabsTrigger value="tab4">Settings</TogeTabsTrigger>
        </TogeTabsList>
        <TogeTabsContent value="tab1" class="mt-4 text-sm text-muted-foreground">Overview content.</TogeTabsContent>
        <TogeTabsContent value="tab2" class="mt-4 text-sm text-muted-foreground">Analytics content.</TogeTabsContent>
        <TogeTabsContent value="tab3" class="mt-4 text-sm text-muted-foreground">Reports content.</TogeTabsContent>
        <TogeTabsContent value="tab4" class="mt-4 text-sm text-muted-foreground">Settings content.</TogeTabsContent>
      </TogeTabs>
    `,
  }),
}
