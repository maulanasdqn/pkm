import { FC, ReactElement } from 'react';
import { VisitorChart } from '../visitor-chart';
import {
  getPeakVisitor,
  getThisMonthVisitor,
  getThisWeekVisitor,
  getTodayVisitor,
} from '@pkm/libs/actions/tourism';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

export const VisitorSection: FC = async (): Promise<ReactElement> => {
  const visitorData = [];
  const todayVisitor = await getTodayVisitor();
  const weekVisitor = await getThisWeekVisitor();
  const peakVisitor = await getPeakVisitor();
  const monthVisitor = await getThisMonthVisitor();
  if (monthVisitor) {
    visitorData.push(monthVisitor);
  }
  return (
    <section className="px-10 py-5 flex gap-5 items-start">
      <VisitorChart visitorData={visitorData} />
      <div className="flex flex-col gap-4 py-3 px-5 w-full h-[300px] rounded-md shadow-md text-white bg-blue-80%">
        <h1 className="text-xl text-center font-semibold">Pengunjung</h1>
        <h2 className="flex flex-col">
          Hari ini
          <span className="text-2xl font-bold">{todayVisitor || 0}</span>
        </h2>
        <h2 className="flex flex-col">
          Minggu ini
          <span className="text-2xl font-bold">{weekVisitor || 0}</span>
        </h2>
        <h2 className="flex flex-col">
          Puncak kunjungan bulan ini
          <span className="text-lg font-bold">
            {format(new Date(peakVisitor.date), 'dd MMMM yyyy', {
              locale: id,
            }) || '-'}
            , {peakVisitor.totalVisitors || 0} pengunjung
          </span>
        </h2>
      </div>
    </section>
  );
};
