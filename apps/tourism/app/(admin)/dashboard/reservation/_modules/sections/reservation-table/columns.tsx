'use client';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { TReservationSchema } from '@pkm/libs/entities';
import { Button } from '@pkm/ui';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

export const columns: ColumnDef<TReservationSchema>[] = [
  {
    accessorKey: 'destination.name',
    header: 'Destinasi',
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="text"
          className="text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tanggal
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpOutlined className="ml-2 text-xs" />
          ) : (
            <ArrowDownOutlined className="ml-2 text-xs" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue('date');

      const formattedDate = format(value as Date, 'dd MMMM yyyy', {
        locale: id,
      });
      return formattedDate;
    },
  },
  {
    accessorKey: 'time',
    header: 'Pukul',
  },
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'No.telp',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const value = row.getValue('email');
      return <p className="w-28 truncate text-ellipsis">{value as string}</p>;
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button
          variant="text"
          className="text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Jumlah
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpOutlined className="ml-2 text-xs" />
          ) : (
            <ArrowDownOutlined className="ml-2 text-xs" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.getValue('status');
      if (value === 'confirmed') {
        return 'dikonfirmasi';
      } else if (value === 'reschedule') {
        return 'dijadwal ulang';
      } else {
        return 'dibatalkan';
      }
    },
  },
];
