import { FC, ReactElement } from 'react';
import { TourFormTrigger } from '../tour-form';
import { columns } from './columns';
import { DataTableTour } from './data-table-tour';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

export const TourListSection: FC = async (): Promise<ReactElement> => {
  const destinations = await getAllDestinations();
  return (
    <section className="px-10 py-5 space-y-5 flex flex-col justify-end items-end">
      <TourFormTrigger text="tambah wisata" />
      <DataTableTour columns={columns} data={destinations.data} />
    </section>
  );
};
