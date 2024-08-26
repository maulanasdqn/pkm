import { FC, ReactElement } from 'react';
import { CreateReservationSection, HeroSection } from './sections';

export const CreateReservationModule: FC = (): ReactElement => {
  return (
    <>
      <HeroSection className="mb-20" />
      <CreateReservationSection className='mb-20'/>
    </>
  );
};
