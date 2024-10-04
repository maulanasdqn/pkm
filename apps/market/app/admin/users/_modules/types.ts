import { Users } from '@pkm/libs/drizzle/market';
import { ColumnDef } from '@tanstack/react-table';

export interface DataTableUsersProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type TUsersTable = Users;
