import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';
import { ReservationSection, VisitorSection } from './sections';

export const DashboardModule: FC = (): ReactElement => {
  return (
    <div className="overflow-y-auto w-full min-h-[130dvh] bg-neutral-20%">
      <DashboardHeader imgSrc="/images/dashboard.webp" title="Dashboard" />
      <VisitorSection />
      <ReservationSection />
    </div>
  );
};
