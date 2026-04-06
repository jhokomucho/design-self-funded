import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeSidebar,
  TogeSidebarContent,
  TogeSidebarFooter,
  TogeSidebarGroup,
  TogeSidebarGroupContent,
  TogeSidebarGroupLabel,
  TogeSidebarHeader,
  TogeSidebarMenu,
  TogeSidebarMenuButton,
  TogeSidebarMenuItem,
  TogeSidebarProvider,
  TogeSidebarTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Sidebar',
  component: TogeSidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-sidebar'),
      },
    },
  },
} satisfies Meta<typeof TogeSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeSidebar,
      TogeSidebarContent,
      TogeSidebarFooter,
      TogeSidebarGroup,
      TogeSidebarGroupContent,
      TogeSidebarGroupLabel,
      TogeSidebarHeader,
      TogeSidebarMenu,
      TogeSidebarMenuButton,
      TogeSidebarMenuItem,
      TogeSidebarProvider,
      TogeSidebarTrigger,
    },
    template: `
      <TogeSidebarProvider class="min-h-[420px] rounded-lg border">
        <TogeSidebar collapsible="none">
          <TogeSidebarHeader>
            <div class="flex items-center justify-between px-2">
              <span class="text-sm font-semibold">Workspace</span>
              <TogeSidebarTrigger />
            </div>
          </TogeSidebarHeader>
          <TogeSidebarContent>
            <TogeSidebarGroup>
              <TogeSidebarGroupLabel>Navigation</TogeSidebarGroupLabel>
              <TogeSidebarGroupContent>
                <TogeSidebarMenu>
                  <TogeSidebarMenuItem>
                    <TogeSidebarMenuButton :is-active="true">Dashboard</TogeSidebarMenuButton>
                  </TogeSidebarMenuItem>
                  <TogeSidebarMenuItem>
                    <TogeSidebarMenuButton>Projects</TogeSidebarMenuButton>
                  </TogeSidebarMenuItem>
                </TogeSidebarMenu>
              </TogeSidebarGroupContent>
            </TogeSidebarGroup>
          </TogeSidebarContent>
          <TogeSidebarFooter>
            <span class="px-2 text-xs text-muted-foreground">Signed in as Toge Admin</span>
          </TogeSidebarFooter>
        </TogeSidebar>
      </TogeSidebarProvider>
    `,
  }),
}
