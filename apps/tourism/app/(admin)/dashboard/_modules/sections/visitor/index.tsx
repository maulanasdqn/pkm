import { FC, ReactElement } from 'react';
import { VisitorChart } from '../visitor-chart';

export const VisitorSection: FC = (): ReactElement => {
  return (
    <section className="px-10 py-5 flex gap-5 items-start">
      <VisitorChart />
      <div className="flex flex-col gap-4 py-3 px-5 w-full h-[300px] rounded-md shadow-md text-white bg-blue-80%">
        <h1 className="text-xl text-center font-semibold">Pengunjung</h1>
        <h2 className="flex flex-col">
          Hari ini
          <span className="text-2xl font-bold">102</span>
        </h2>
        <h2 className="flex flex-col">
          Minggu ini
          <span className="text-2xl font-bold">204</span>
        </h2>
        <h2 className="flex flex-col">
          Puncak kunjungan bulan ini
          <span className="text-lg font-bold">
            18 Agustus 2024, 150 pengunjung
          </span>
        </h2>
      </div>
    </section>
  );
};
