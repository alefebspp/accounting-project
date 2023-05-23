import { Dispatch, SetStateAction } from 'react';
import { Control } from 'react-hook-form';

export interface DateInputProps {
  label: string;
  selectedDate: Date | undefined | null;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined | null>>;
  control: Control<any>;
  name: string;
}
