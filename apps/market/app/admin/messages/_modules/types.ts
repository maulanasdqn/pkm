import { Messages } from '@pkm/libs/drizzle/market';
import { ColumnDef } from '@tanstack/react-table';

export interface DataTableMessagesProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type TMessagesTable = Messages;
