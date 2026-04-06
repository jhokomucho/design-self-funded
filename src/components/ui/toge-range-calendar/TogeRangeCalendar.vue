<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import {
  TogeRangeCalendarCell,
  TogeRangeCalendarCellTrigger,
  TogeRangeCalendarGrid,
  TogeRangeCalendarGridBody,
  TogeRangeCalendarGridHead,
  TogeRangeCalendarGridRow,
  TogeRangeCalendarHeadCell,
  TogeRangeCalendarHeader,
  TogeRangeCalendarHeading,
  TogeRangeCalendarNextButton,
  TogeRangeCalendarPrevButton,
} from '.'

const props = defineProps<RangeCalendarRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<RangeCalendarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <RangeCalendarRoot
    v-slot="{ grid, weekDays }"
    data-slot="range-calendar"
    v-bind="forwarded"
    :class="cn('rounded-md border border-weak bg-surface-white p-3', props.class)"
  >
    <TogeRangeCalendarHeader>
      <TogeRangeCalendarHeading />

      <div class="flex items-center gap-1">
        <TogeRangeCalendarPrevButton />
        <TogeRangeCalendarNextButton />
      </div>
    </TogeRangeCalendarHeader>

    <div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <TogeRangeCalendarGrid v-for="month in grid" :key="month.value.toString()">
        <TogeRangeCalendarGridHead>
          <TogeRangeCalendarGridRow>
            <TogeRangeCalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </TogeRangeCalendarHeadCell>
          </TogeRangeCalendarGridRow>
        </TogeRangeCalendarGridHead>
        <TogeRangeCalendarGridBody>
          <TogeRangeCalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-full"
          >
            <TogeRangeCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <TogeRangeCalendarCellTrigger :day="weekDate" :month="month.value" />
            </TogeRangeCalendarCell>
          </TogeRangeCalendarGridRow>
        </TogeRangeCalendarGridBody>
      </TogeRangeCalendarGrid>
    </div>
  </RangeCalendarRoot>
</template>
