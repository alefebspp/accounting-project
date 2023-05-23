import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues | any>;
  className?: string;
  inputLabel?: string;
  inputName: string;
  inputDivClassName?: string;
}
