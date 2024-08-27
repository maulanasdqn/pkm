import { CalendarOutlined, ReloadOutlined } from '@ant-design/icons';
import { ReservationCards } from '@pkm/ui';
import { FC, ReactElement } from 'react';

const reservationItems = [
  {
    icon: <CalendarOutlined className="text-2xl ml-10" />,
    label: 'Reservasi dikonfirmasi',
    missedCount: 26,
    incomingCount: 8,
    bgColor: 'bg-primary-20%',
    color: 'text-primary-80%',
  },
  {
    icon: <ReloadOutlined className="text-2xl ml-10" />,
    label: 'Reservasi dijadwal ulang',
    missedCount: 26,
    incomingCount: 8,
    bgColor: 'bg-secondary-20%',
    color: 'text-secondary-80%',
  },
  {
    icon: <CalendarOutlined className="text-2xl ml-10" />,
    label: 'Reservasi dibatalkan',
    missedCount: 26,
    incomingCount: 8,
    bgColor: 'bg-red-20%',
    color: 'text-red-80%',
  },
];
export const ReservationSection: FC = (): ReactElement => {
  return (
    <section className="px-10 py-5 space-y-5 mb-10">
      <h1 className="text-center text-xl font-semibold">
        Reservasi Bulan Agustus
      </h1>
      <ReservationCards reservationItems={reservationItems} />
    </section>
  );
};
