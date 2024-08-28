import { FC, ReactElement } from 'react';
import { TReservationCardsProp } from './type';
import { cn } from '@pkm/libs/clsx';

export const ReservationCards: FC<TReservationCardsProp> = ({
  reservationItems,
  className,
}): ReactElement => {
  return (
    <div className={cn('grid grid-cols-3 gap-8', className)}>
      {reservationItems.map((item, index) => (
        <div
          key={index}
          className={cn(
            'p-4 rounded-md shadow-md flex flex-col gap-2',
            item.bgColor
          )}
        >
          {item.icon}
          <h1 className="text-center text-xl">{item.label}</h1>
          <div className="flex gap-5 w-full items-center justify-center">
            <div className={cn('space-y-2 text-center', item.color)}>
              <h5 className="text-xl">Terlewat</h5>
              <h1 className="text-5xl font-bold">{item.missedCount}</h1>
            </div>
            <div className={cn('space-y-2 text-center', item.color)}>
              <h5 className="text-xl">Akan datang</h5>
              <h1 className="text-5xl font-bold">{item.incomingCount}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
