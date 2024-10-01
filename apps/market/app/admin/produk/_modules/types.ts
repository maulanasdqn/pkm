import { Category, Products } from '@pkm/libs/drizzle/market';
import { ColumnDef } from '@tanstack/react-table';

export interface DataTableProductProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type TProductTable = Products & {
  category: Category | null;
};
