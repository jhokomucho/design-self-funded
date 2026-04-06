import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeNavigationMenu,
  TogeNavigationMenuContent,
  TogeNavigationMenuItem,
  TogeNavigationMenuLink,
  TogeNavigationMenuList,
  TogeNavigationMenuTrigger,
} from '.'

const meta = {
  title: 'Toge UI/Navigation Menu',
  component: TogeNavigationMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-navigation-menu'),
      },
    },
  },
} satisfies Meta<typeof TogeNavigationMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeNavigationMenu,
      TogeNavigationMenuContent,
      TogeNavigationMenuItem,
      TogeNavigationMenuLink,
      TogeNavigationMenuList,
      TogeNavigationMenuTrigger,
    },
    template: `
      <TogeNavigationMenu :viewport="false">
        <TogeNavigationMenuList>
          <TogeNavigationMenuItem>
            <TogeNavigationMenuTrigger>Getting Started</TogeNavigationMenuTrigger>
            <TogeNavigationMenuContent force-mount class="w-[220px]">
              <TogeNavigationMenuLink href="/docs">
                <span class="font-medium">Docs</span>
                <span class="text-muted-foreground">Read the component guides.</span>
              </TogeNavigationMenuLink>
            </TogeNavigationMenuContent>
          </TogeNavigationMenuItem>
        </TogeNavigationMenuList>
      </TogeNavigationMenu>
    `,
  }),
}
