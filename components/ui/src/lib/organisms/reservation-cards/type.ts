import { ReactNode } from 'react';

export type TReservationCardsProp = {
  reservationItems: ReservationItems[];
  className?: string;
};

type ReservationItems = {
  icon: ReactNode;
  label: string;
  missedCount: number;
  incomingCount: number;
  bgColor: string;
  color: string;
};
