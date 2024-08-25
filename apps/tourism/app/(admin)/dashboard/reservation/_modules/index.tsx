import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';

export const ReservationModule: FC = (): ReactElement => {
  return (
    <>
      <DashboardHeader
        imgSrc="/images/reservation.webp"
        title="manajemen reservasi"
      />
    </>
  );
};
