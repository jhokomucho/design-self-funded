<script setup lang="ts">
import type { ColumnDef, RowData } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import {
  TogeTable,
  TogeTableBody,
  TogeTableCell,
  TogeTableEmpty,
  TogeTableHead,
  TogeTableHeader,
  TogeTableRow,
} from '@/components/ui/toge-table'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<unknown, unknown>[]
    data: unknown[]
    caption?: string
    emptyMessage?: string
    getRowId?: (originalRow: unknown, index: number, parent?: RowData) => string
  }>(),
  {
    caption: undefined,
    emptyMessage: 'No results.',
    getRowId: undefined,
  },
)

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getRowId: props.getRowId,
})
</script>

<template>
  <div data-slot="data-table">
    <TogeTable>
      <caption
        v-if="caption"
        data-slot="data-table-caption"
        class="text-muted-foreground mt-4 text-sm"
      >
        {{
          caption
        }}
      </caption>
      <TogeTableHeader>
        <TogeTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TogeTableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TogeTableHead>
        </TogeTableRow>
      </TogeTableHeader>
      <TogeTableBody>
        <template v-if="table.getRowModel().rows.length">
          <TogeTableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
          >
            <TogeTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TogeTableCell>
          </TogeTableRow>
        </template>
        <TogeTableEmpty v-else :colspan="columns.length">
          {{ emptyMessage }}
        </TogeTableEmpty>
      </TogeTableBody>
    </TogeTable>
  </div>
</template>
