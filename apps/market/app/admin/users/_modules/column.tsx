'use client';
import { ColumnDef } from '@tanstack/react-table';
import { TUsersTable } from './types';

export const columns: ColumnDef<TUsersTable>[] = [
  {
    accessorKey: 'fullname',
    header: 'Nama',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Nomor Telepon',
  },
  {
    accessorKey: 'gender',
    header: 'Jenis Kelamin',
    accessorFn: (row) => {
      if (row.gender === 'male') {
        return 'Laki-laki';
      } else if (row.gender === 'female') {
        return 'Perempuan';
      }
    },
  },
];
