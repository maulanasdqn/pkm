import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';
import { TourListSection } from './sections';

export const TourModule: FC = (): ReactElement => {
  return (
    <div className="overflow-y-auto w-full bg-neutral-20%">
      <DashboardHeader
        imgSrc="/images/tour.webp"
        title="manajemen wisata"
        imgClassName="max-w-[300px]"
      />
      <TourListSection />
    </div>
  );
};
