'use client';

import { DayPicker } from 'react-day-picker';
import { cn } from '@pkm/libs/clsx';
import { CalendarProps } from './type';
import { id } from 'date-fns/locale/id';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={id}
      showOutsideDays={showOutsideDays}
      className={cn('p-3 max-w-sm', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-0 sm:space-y-0',
        month_caption: 'flex justify-center py-2 items-center',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center',
        button_previous:
          'size-5 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-10 top-5',
        button_next:
          'size-5 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-10 top-5',
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'rounded-md w-9 font-semibold text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary-30% [&:has([aria-selected])]:bg-primary-40% first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button:
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary-30% rounded-md',
        range_end: 'day-range-end',
        selected:
          'bg-primary text-white focus:bg-primary focus:text-white rounded-md',
        today:
          'bg-primary-30% text-white rounded hover:text-primary-70% aria-selected:bg-primary',
        outside:
          'day-outside text-neutral-60% aria-selected:bg-primary-30% aria-selected:text-primary-60% ',
        disabled: 'text-neutral-60%',
        range_middle: 'aria-selected:bg-primary-30# aria-selected:text-white',
        hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
