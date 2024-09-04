import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pkm/ui';
import { FC, ReactElement } from 'react';

const reservations = [
  {
    destination: 'Danau',
    status: 'Dikonfirmasi',
    date: '2022 Agustus 01',
    time: '08:00',
    name: 'John Doe',
    phone: '08123456789',
    email: 'pYjXv@example.com',
    quantity: 2,
  },
  {
    destination: 'Danau',
    status: 'Dikonfirmasi',
    date: '2022 Agustus 01',
    time: '08:00',
    name: 'John Doe',
    phone: '08123456789',
    email: 'pYjXv@example.com',
    quantity: 2,
  },
  {
    destination: 'Pertunjukan',
    status: 'Jadwal ulang',
    date: '2022 Agustus 01',
    time: '08:00',
    name: 'John Die',
    phone: '08123456789',
    email: 'pYjXv@example.com',
    quantity: 2,
  },
  {
    destination: 'Pertanian',
    status: 'Dibatalkan',
    date: '2022 Agustus 01',
    time: '08:00',
    name: 'John Doe',
    phone: '08123456789',
    email: 'pYjXv@example.com',
    quantity: 5,
  },
  {
    destination: 'Danau',
    status: 'Dikonfirmasi',
    date: '2022 Agustus 01',
    time: '08:00',
    name: 'John Doe',
    phone: '08123456789',
    email: 'pYjXv@example.com',
    quantity: 2,
  },
];

export const ReservationTable: FC = (): ReactElement => {
  return (
    <section className="px-10 pb-10">
      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          <TableRow className="bg-primary-80% hover:bg-primary-90%">
            <TableHead>No</TableHead>
            <TableHead>Destinasi</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead>Pukul</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>No.telp</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-5">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation, index) => (
            <TableRow
              key={reservation.name}
              className="odd:bg-primary-20% even:bg-primary-30% hover:bg-primary-40% border-0"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{reservation.destination}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time}</TableCell>
              <TableCell>{reservation.name}</TableCell>
              <TableCell>{reservation.phone}</TableCell>
              <TableCell>{reservation.email}</TableCell>
              <TableCell className="text-center">
                {reservation.quantity}
              </TableCell>
              <TableCell>{reservation.status}</TableCell>
              <TableCell className="text-right">
                <Button>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
