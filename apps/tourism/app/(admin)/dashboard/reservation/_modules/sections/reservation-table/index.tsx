import { FC, ReactElement } from 'react';
import { getAllReservations } from '@pkm/libs/actions/tourism';
import { columns } from './columns';
import { DataTableReservation } from './data-table-reservations';

export const dynamic = 'force-dynamic';

export const ReservationTable: FC = async (): Promise<ReactElement> => {
  const reservations = await getAllReservations();
  return (
    <section className="px-10 pb-10">
      <DataTableReservation columns={columns} data={reservations.data} />
    </section>
  );
};
