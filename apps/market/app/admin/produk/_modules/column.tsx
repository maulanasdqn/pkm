'use client';
import { ColumnDef } from '@tanstack/react-table';
import { TProductTable } from './types';

export const columns: ColumnDef<TProductTable>[] = [
  {
    accessorKey: 'price',
    header: 'Harga',
    accessorFn: (row) => {
      return `Rp ${row.price.toLocaleString('id-ID')}`;
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stok',
    accessorFn: (row) => {
      return `${row.stock} pcs`;
    },
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
];
