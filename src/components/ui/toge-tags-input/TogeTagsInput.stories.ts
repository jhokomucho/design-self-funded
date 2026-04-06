import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import {
  TogeTagsInput,
  TogeTagsInputInput,
  TogeTagsInputItem,
  TogeTagsInputItemDelete,
  TogeTagsInputItemText,
} from '.'

const meta = {
  title: 'Toge UI/Tags Input',
  component: TogeTagsInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TogeTagsInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: {
      TogeTagsInput,
      TogeTagsInputInput,
      TogeTagsInputItem,
      TogeTagsInputItemDelete,
      TogeTagsInputItemText,
    },
    setup() {
      const tags = ref(['Vue', 'Design System'])
      return { tags }
    },
    template: `
      <TogeTagsInput v-model="tags" class="w-[320px]">
        <TogeTagsInputItem v-for="tag in tags" :key="tag" :value="tag">
          <TogeTagsInputItemText />
          <TogeTagsInputItemDelete />
        </TogeTagsInputItem>
        <TogeTagsInputInput placeholder="Add tag..." />
      </TogeTagsInput>
    `,
  }),
}
