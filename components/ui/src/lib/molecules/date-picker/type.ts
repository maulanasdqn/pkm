export type TDatePickerProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  disableDayBeforeToday?: boolean;
};
