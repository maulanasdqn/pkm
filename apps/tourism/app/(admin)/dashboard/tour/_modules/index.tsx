import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';

export const TourModule: FC = (): ReactElement => {
  return (
    <>
      <DashboardHeader
        imgSrc="/images/tour.webp"
        title="manajemen wisata"
        imgClassName="max-w-[320px]"
      />
    </>
  );
};
