'use client';
import { ColumnDef } from '@tanstack/react-table';
import { TMessagesTable } from './types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

export const columns: ColumnDef<TMessagesTable>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Tanggal',
    accessorFn: (row) => {
      const date = new Date(row.createdAt as Date);
      return format(date, 'dd MMMM yyyy', { locale: id });
    },
  },
  {
    accessorKey: 'sender',
    header: 'Pengirim',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
