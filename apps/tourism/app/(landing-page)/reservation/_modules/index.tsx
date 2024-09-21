import { FC, ReactElement } from 'react';
import { CekReservationSection, HeroSection } from './sections';

export const ReservationModule: FC = (): ReactElement => {
  return (
    <>
      <HeroSection className="mb-10 md:mb-20" />
      <CekReservationSection className="mb-10 md:mb-20" />
    </>
  );
};
