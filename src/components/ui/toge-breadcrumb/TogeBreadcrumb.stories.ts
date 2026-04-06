import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import {
  TogeBreadcrumb,
  TogeBreadcrumbItem,
  TogeBreadcrumbLink,
  TogeBreadcrumbList,
  TogeBreadcrumbPage,
  TogeBreadcrumbSeparator,
} from '.'

const meta = {
  title: 'Toge UI/Breadcrumb',
  component: TogeBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-breadcrumb'),
      },
    },
  },
} satisfies Meta<typeof TogeBreadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeBreadcrumb,
      TogeBreadcrumbItem,
      TogeBreadcrumbLink,
      TogeBreadcrumbList,
      TogeBreadcrumbPage,
      TogeBreadcrumbSeparator,
    },
    template: `
      <TogeBreadcrumb>
        <TogeBreadcrumbList>
          <TogeBreadcrumbItem>
            <TogeBreadcrumbLink href="/">Home</TogeBreadcrumbLink>
          </TogeBreadcrumbItem>
          <TogeBreadcrumbSeparator />
          <TogeBreadcrumbItem>
            <TogeBreadcrumbLink href="/components">Components</TogeBreadcrumbLink>
          </TogeBreadcrumbItem>
          <TogeBreadcrumbSeparator />
          <TogeBreadcrumbItem>
            <TogeBreadcrumbPage>Breadcrumb</TogeBreadcrumbPage>
          </TogeBreadcrumbItem>
        </TogeBreadcrumbList>
      </TogeBreadcrumb>
    `,
  }),
}
