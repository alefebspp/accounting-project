import clsx from 'clsx';
import { InputProps } from './interface';

export const Input = ({
  register,
  className,
  inputLabel,
  inputName,
  inputDivClassName,
  ...props
}: InputProps) => {
  return (
    <div className={clsx('flex flex-col', inputDivClassName)}>
      <label htmlFor="">{inputLabel}</label>
      <input
        {...(register && register(inputName || ''))}
        className={clsx(
          'border border-gray-400 rounded-lg px-2 h-8 focus:outline-0',
          className
        )}
        {...props}
      />
    </div>
  );
};
