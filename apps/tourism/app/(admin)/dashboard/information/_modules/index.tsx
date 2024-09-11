import { FC, ReactElement } from 'react';
import { DashboardHeader } from '@pkm/ui';
import { InformationListSection, InformationFormTrigger } from './sections';

export const InformationModule: FC = (): ReactElement => {
  return (
    <div className="overflow-y-auto w-full bg-neutral-20%">
      <DashboardHeader
        imgSrc="/images/tour.webp"
        title="manajemen informasi"
        imgClassName="max-w-[320px]"
      />
      <div className="px-10 pt-5 w-full flex justify-end">
        <InformationFormTrigger text="Tambah Informasi Wisata" />
      </div>
      <InformationListSection />
    </div>
  );
};
