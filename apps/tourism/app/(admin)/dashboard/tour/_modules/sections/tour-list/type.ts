import { ColumnDef } from '@tanstack/react-table';

export interface DataTableTourProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
