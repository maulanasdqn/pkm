import { OrdersWithUserItems } from '@pkm/libs/drizzle/market';
import { ColumnDef } from '@tanstack/react-table';

export interface DataTableOrdersProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type TOrdersTable = OrdersWithUserItems;
