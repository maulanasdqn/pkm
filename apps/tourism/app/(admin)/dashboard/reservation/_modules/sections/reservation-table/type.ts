import { ColumnDef } from '@tanstack/react-table';

export interface DataTableReservationProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type TReservationForm = {
  id: string;
};
