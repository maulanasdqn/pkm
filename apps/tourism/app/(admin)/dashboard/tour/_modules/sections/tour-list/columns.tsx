'use client';
import { TDestinationSchema } from '@pkm/libs/entities';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<TDestinationSchema>[] = [
  {
    accessorKey: 'name',
    header: 'Destinasi',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.getValue('status');
      return value === 'active' ? 'Aktif' : 'Tidak Aktif';
    },
  },
];
