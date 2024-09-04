import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';
import { ReservationCardsSection, ReservationTable } from './sections';

export const ReservationModule: FC = (): ReactElement => {
  return (
    <div className="overflow-y-auto w-full bg-neutral-20%">
      <DashboardHeader
        imgSrc="/images/reservation.webp"
        title="manajemen reservasi"
      />
      <ReservationCardsSection />
      <ReservationTable />
    </div>
  );
};
