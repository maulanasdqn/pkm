import * as React from 'react';
import { ResidentChart } from './resident-chart';
export const ResidentSection: React.FC = (): React.ReactElement => {
  return (
    <section className="bg-primary-10%">
      <div className="container flex flex-col py-14 gap-8 md:gap-2 items-center justify-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
          Jumlah Penduduk
        </h1>
        <div className="flex flex-wrap w-full items-center justify-center gap-8 md:gap-0">
          <div className="max-w-xs rounded border border-primary px-4 py-6 space-y-4 text-center">
            <h1 className="text-lg md:text-2xl text-primary font-medium">
              Kepala Keluarga
            </h1>
            <h2 className="text-2xl md:text-4xl font-medium text-primary">
              5678
            </h2>
          </div>
          <ResidentChart />
        </div>
      </div>
    </section>
  );
};
