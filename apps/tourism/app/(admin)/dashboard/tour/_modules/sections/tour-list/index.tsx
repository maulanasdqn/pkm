'use client';
import { FC, ReactElement } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@pkm/ui';
import { TourFormTrigger } from '../tour-form';

const destinations = [
  {
    name: 'Danau',
    status: 'Aktif',
  },
  {
    name: 'Pertunjukan ',
    status: 'Aktif',
  },
  {
    name: 'Pertanian Organik',
    status: 'Aktif',
  },
  {
    name: 'Fotogenik Sawah',
    status: 'Aktif',
  },
  {
    name: 'Pegunungan',
    status: 'Tidak Aktif',
  },
  {
    name: 'Perikanan',
    status: 'Tidak Aktif',
  },
];

export const TourListSection: FC = (): ReactElement => {
  return (
    <section className="px-10 py-5 space-y-5 flex flex-col justify-end items-end">
      <TourFormTrigger text="tambah wisata" />
      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          <TableRow className="bg-primary-80% hover:bg-primary-90%">
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Destinasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-5">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.map((destination, index) => (
            <TableRow
              key={destination.name}
              className="odd:bg-primary-20% even:bg-primary-30% hover:bg-primary-50% border-0"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{destination.name}</TableCell>
              <TableCell>{destination.status}</TableCell>
              <TableCell className="text-right">
                <TourFormTrigger text="edit" id={index + 1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
