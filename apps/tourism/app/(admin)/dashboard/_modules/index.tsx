import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';

export const DashboardModule: FC = (): ReactElement => {
  return (
    <>
      <DashboardHeader imgSrc="/images/dashboard.webp" title="Dashboard" />
    </>
  );
};
