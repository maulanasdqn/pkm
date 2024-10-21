'use client';
import { ColumnDef } from '@tanstack/react-table';
import { TOrdersTable } from './types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

export const columns: ColumnDef<TOrdersTable>[] = [
  {
    accessorKey: 'user.fullname',
    header: 'Nama',
  },
  {
    accessorKey: 'createdAt',
    header: 'Tanggal Pemesanan',
    accessorFn: (row) => {
      const date = new Date(row?.createdAt as Date);
      return format(date, 'dd MMMM yyyy', { locale: id });
    },
  },
  {
    accessorKey: 'product',
    header: 'Produk',
    accessorFn: (row) => {
      const items = row?.cartItems?.map((item) => {
        return `${item?.product?.name} (${item?.quantity} pcs)`;
      });

      return items?.join(', ');
    },
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total',
    accessorFn: (row) => {
      return `Rp ${row.totalPrice?.toLocaleString('id-ID')}`;
    },
  },
];
