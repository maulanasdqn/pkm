'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarFilled } from '@ant-design/icons';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../atoms';
import { id } from 'date-fns/locale/id';
import { TDatePickerProps } from './type';

export const DatePicker: React.FC<TDatePickerProps> = ({
  date,
  setDate,
  disableDayBeforeToday = false,
}): React.ReactElement => {
  const disableDate = (date: Date) => date < new Date();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <CalendarFilled className="mr-2 text-base" />
          {date ? (
            format(date, 'PPP', { locale: id })
          ) : (
            <span>Pilih Tanggal</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disableDayBeforeToday ? disableDate : false}
        />
      </PopoverContent>
    </Popover>
  );
};
