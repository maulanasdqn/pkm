import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';

export const DashboardModule: FC = (): ReactElement => {
  return (
    <div className="overflow-y-auto w-full min-h-[130dvh] bg-neutral-100">
      <DashboardHeader imgSrc="/images/dashboard.webp" title="Dashboard" />
    </div>
  );
};
