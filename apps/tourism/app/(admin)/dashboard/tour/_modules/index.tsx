import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';
import { TourListSection } from './sections';

export const TourModule: FC = (): ReactElement => {
  return (
    <div className="overflow-y-auto w-full">
      <DashboardHeader
        imgSrc="/images/tour.webp"
        title="manajemen wisata"
        imgClassName="max-w-[320px]"
      />
      <TourListSection />
    </div>
  );
};
