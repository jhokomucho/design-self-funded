import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import { TogeAccordion, TogeAccordionContent, TogeAccordionItem, TogeAccordionTrigger } from '.'

const meta = {
  title: 'Toge UI/Accordion',
  component: TogeAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-accordion'),
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TogeAccordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeAccordion,
      TogeAccordionContent,
      TogeAccordionItem,
      TogeAccordionTrigger,
    },
    template: `
      <TogeAccordion type="single" collapsible default-value="a">
        <TogeAccordionItem value="a" class="border-border">
          <TogeAccordionTrigger>First section</TogeAccordionTrigger>
          <TogeAccordionContent class="text-muted-foreground">
            Content for the first section.
          </TogeAccordionContent>
        </TogeAccordionItem>
        <TogeAccordionItem value="b" class="border-border">
          <TogeAccordionTrigger>Second section</TogeAccordionTrigger>
          <TogeAccordionContent class="text-muted-foreground">
            Content for the second section.
          </TogeAccordionContent>
        </TogeAccordionItem>
      </TogeAccordion>
    `,
  }),
}
