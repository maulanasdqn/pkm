import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';

export const InformationModule: FC = (): ReactElement => {
  return (
    <>
      <DashboardHeader imgSrc="/images/tour.webp" title="manajemen informasi" />
    </>
  );
};
