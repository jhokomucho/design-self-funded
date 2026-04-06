<script setup lang="ts">
import type { DateValue, CalendarRootEmits, CalendarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { Icon } from '@iconify/vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { TogeCalendar } from '@/components/ui/toge-calendar'
import { TogePopover, TogePopoverContent, TogePopoverTrigger } from '@/components/ui/toge-popover'
import type { TogeCalendarLayout } from '@/components/ui/toge-calendar'

const props = withDefaults(
  defineProps<
    CalendarRootProps & {
      class?: HTMLAttributes['class']
      triggerClass?: HTMLAttributes['class']
      placeholderText?: string
      layout?: TogeCalendarLayout
    }
  >(),
  {
    placeholderText: 'Pick a date',
    layout: 'month-and-year',
  },
)
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'triggerClass', 'placeholderText')

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const defaultPlaceholder = computed<DateValue>(() => {
  return (props.defaultPlaceholder as DateValue | undefined) ?? today(getLocalTimeZone())
})
const formatter = computed(
  () =>
    new DateFormatter(props.locale ?? 'en-US', {
      dateStyle: 'long',
    }),
)
const calendarModelValue = computed<DateValue | undefined>(() => {
  return modelValue.value as DateValue | undefined
})

const displayValue = computed(() => {
  return modelValue.value
    ? formatter.value.format((modelValue.value as DateValue).toDate(getLocalTimeZone()))
    : props.placeholderText
})
</script>

<template>
  <div data-slot="date-picker">
    <TogePopover v-slot="{ close }">
      <TogePopoverTrigger as-child>
        <button
          data-slot="date-picker-trigger"
          type="button"
          :class="
            cn(
              'border-input flex h-9 w-[240px] cursor-pointer items-center gap-2 rounded-md border bg-surface-white px-3 font-normal text-strong outline-none transition-[color,box-shadow]',
              'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=open]:border-ring data-[state=open]:ring-[3px] data-[state=open]:ring-ring/50',
              !modelValue && 'text-muted-foreground',
              props.triggerClass,
            )
          "
        >
          <Icon icon="lucide:calendar" class="size-4 shrink-0" />
          {{ displayValue }}
        </button>
      </TogePopoverTrigger>
      <TogePopoverContent class="w-auto p-0 border-0" align="start">
        <TogeCalendar
          v-bind="delegatedProps"
          :model-value="calendarModelValue"
          :class="props.class"
          :default-placeholder="defaultPlaceholder"
          @update:model-value="
            (value) => {
              modelValue = value as DateValue | undefined
              close()
            }
          "
        />
      </TogePopoverContent>
    </TogePopover>
  </div>
</template>
