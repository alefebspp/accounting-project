import { ButtonProps } from './interface';
import clsx from 'clsx';

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={clsx('', className)}>
      {children}
    </button>
  );
};
