import { CalendarOutlined, ReloadOutlined } from '@ant-design/icons';
import { getCardData } from '@pkm/libs/actions/tourism';
import { ReservationCards } from '@pkm/ui';
import { FC, ReactElement } from 'react';

const reservationItems = [
  {
    icon: <CalendarOutlined className="text-2xl ml-10" />,
    label: 'Reservasi dikonfirmasi',
    missedCount: 0,
    incomingCount: 0,
    bgColor: 'bg-primary-20%',
    color: 'text-primary-80%',
  },
  {
    icon: <ReloadOutlined className="text-2xl ml-10" />,
    label: 'Reservasi dijadwal ulang',
    missedCount: 0,
    incomingCount: 0,
    bgColor: 'bg-secondary-20%',
    color: 'text-secondary-80%',
  },
  {
    icon: <CalendarOutlined className="text-2xl ml-10" />,
    label: 'Reservasi dibatalkan',
    missedCount: 0,
    incomingCount: 0,
    bgColor: 'bg-red-20%',
    color: 'text-red-80%',
  },
];

export const ReservationCardsSection: FC = async (): Promise<ReactElement> => {
  const { confirmed, canceled, rescheduled } = await getCardData();
  if (confirmed) {
    reservationItems[0].incomingCount = confirmed.upcomingCount;
    reservationItems[0].missedCount = confirmed.missedCount;
  }
  if (rescheduled) {
    reservationItems[1].incomingCount = rescheduled.upcomingCount;
    reservationItems[1].missedCount = rescheduled.missedCount;
  }
  if (canceled) {
    reservationItems[2].incomingCount = canceled.upcomingCount;
    reservationItems[2].missedCount = canceled.missedCount;
  }
  return (
    <section className="px-10 py-5 space-y-5 mb-10">
      <ReservationCards reservationItems={reservationItems} />
    </section>
  );
};
