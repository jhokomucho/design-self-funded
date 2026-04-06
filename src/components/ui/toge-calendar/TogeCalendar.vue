<script setup lang="ts">
import type { DateValue, CalendarRootEmits, CalendarRootProps } from 'reka-ui'
import type { HTMLAttributes, Ref } from 'vue'
import { getLocalTimeZone, today } from '@internationalized/date'
import { createReusableTemplate, reactiveOmit, useVModel } from '@vueuse/core'
import { CalendarRoot, useDateFormatter, useForwardPropsEmits } from 'reka-ui'
import { createYear, createYearRange, toDate } from 'reka-ui/date'
import { computed, toRaw } from 'vue'
import { cn } from '@/lib/utils'
import { TogeNativeSelect, TogeNativeSelectOption } from '@/components/ui/toge-native-select'
import {
  TogeCalendarCell,
  TogeCalendarCellTrigger,
  TogeCalendarGrid,
  TogeCalendarGridBody,
  TogeCalendarGridHead,
  TogeCalendarGridRow,
  TogeCalendarHeadCell,
  TogeCalendarHeader,
  TogeCalendarHeading,
  TogeCalendarNextButton,
  TogeCalendarPrevButton,
} from '.'

export type TogeCalendarLayout = 'month-and-year' | 'month-only' | 'year-only'

const props = withDefaults(
  defineProps<
    CalendarRootProps & {
      class?: HTMLAttributes['class']
      layout?: TogeCalendarLayout
      yearRange?: DateValue[]
    }
  >(),
  {
    modelValue: undefined,
    layout: undefined,
  },
)
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'layout', 'placeholder')

const placeholder = useVModel(props, 'placeholder', emits, {
  passive: true,
  defaultValue: props.defaultPlaceholder ?? today(getLocalTimeZone()),
}) as Ref<DateValue>

const formatter = useDateFormatter(props.locale ?? 'en')

const yearRange = computed(() => {
  return (
    props.yearRange ??
    createYearRange({
      start:
        props.minValue ??
        (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone())).cycle(
          'year',
          -100,
        ),
      end:
        props.maxValue ??
        (toRaw(props.placeholder) ?? props.defaultPlaceholder ?? today(getLocalTimeZone())).cycle(
          'year',
          10,
        ),
    })
  )
})

const [DefineMonthTemplate, ReuseMonthTemplate] = createReusableTemplate<{ date: DateValue }>()
const [DefineYearTemplate, ReuseYearTemplate] = createReusableTemplate<{ date: DateValue }>()

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DefineMonthTemplate v-slot="{ date }">
    <div class="**:data-[slot=native-select-icon]:right-1">
      <div class="relative">
        <div class="pointer-events-none absolute inset-0 flex h-full items-center pl-2 text-sm">
          {{ formatter.custom(toDate(date), { month: 'short' }) }}
        </div>
        <TogeNativeSelect
          class="relative h-8 pr-6 pl-2 text-xs text-transparent"
          :model-value="date.month"
          @change="
            (event: Event) => {
              placeholder = placeholder.set({
                month: Number((event.target as HTMLSelectElement)?.value),
              })
            }
          "
        >
          <TogeNativeSelectOption
            v-for="month in createYear({ dateObj: date })"
            :key="month.toString()"
            :value="month.month"
            :selected="date.month === month.month"
          >
            {{ formatter.custom(toDate(month), { month: 'short' }) }}
          </TogeNativeSelectOption>
        </TogeNativeSelect>
      </div>
    </div>
  </DefineMonthTemplate>

  <DefineYearTemplate v-slot="{ date }">
    <div class="**:data-[slot=native-select-icon]:right-1">
      <div class="relative">
        <div class="pointer-events-none absolute inset-0 flex h-full items-center pl-2 text-sm">
          {{ formatter.custom(toDate(date), { year: 'numeric' }) }}
        </div>
        <TogeNativeSelect
          class="relative h-8 pr-6 pl-2 text-xs text-transparent"
          :model-value="date.year"
          @change="
            (event: Event) => {
              placeholder = placeholder.set({
                year: Number((event.target as HTMLSelectElement)?.value),
              })
            }
          "
        >
          <TogeNativeSelectOption
            v-for="year in yearRange"
            :key="year.toString()"
            :value="year.year"
            :selected="date.year === year.year"
          >
            {{ formatter.custom(toDate(year), { year: 'numeric' }) }}
          </TogeNativeSelectOption>
        </TogeNativeSelect>
      </div>
    </div>
  </DefineYearTemplate>

  <CalendarRoot
    v-slot="{ grid, weekDays, date }"
    v-bind="forwarded"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="cn('rounded-md border border-weak bg-surface-white p-3', props.class)"
  >
    <TogeCalendarHeader class="pt-0">
      <nav class="absolute inset-x-0 top-0 flex items-center justify-between gap-1">
        <TogeCalendarPrevButton>
          <slot name="calendar-prev-icon" />
        </TogeCalendarPrevButton>
        <TogeCalendarNextButton>
          <slot name="calendar-next-icon" />
        </TogeCalendarNextButton>
      </nav>

      <slot
        name="calendar-heading"
        :date="date"
        :month="ReuseMonthTemplate"
        :year="ReuseYearTemplate"
      >
        <template v-if="layout === 'month-and-year'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate :date="date" />
            <ReuseYearTemplate :date="date" />
          </div>
        </template>
        <template v-else-if="layout === 'month-only'">
          <div class="flex items-center justify-center gap-1">
            <ReuseMonthTemplate :date="date" />
            {{ formatter.custom(toDate(date), { year: 'numeric' }) }}
          </div>
        </template>
        <template v-else-if="layout === 'year-only'">
          <div class="flex items-center justify-center gap-1">
            {{ formatter.custom(toDate(date), { month: 'short' }) }}
            <ReuseYearTemplate :date="date" />
          </div>
        </template>
        <template v-else>
          <TogeCalendarHeading />
        </template>
      </slot>
    </TogeCalendarHeader>

    <div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <TogeCalendarGrid v-for="month in grid" :key="month.value.toString()">
        <TogeCalendarGridHead>
          <TogeCalendarGridRow>
            <TogeCalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </TogeCalendarHeadCell>
          </TogeCalendarGridRow>
        </TogeCalendarGridHead>
        <TogeCalendarGridBody>
          <TogeCalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-full"
          >
            <TogeCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <TogeCalendarCellTrigger :day="weekDate" :month="month.value" />
            </TogeCalendarCell>
          </TogeCalendarGridRow>
        </TogeCalendarGridBody>
      </TogeCalendarGrid>
    </div>
  </CalendarRoot>
</template>
