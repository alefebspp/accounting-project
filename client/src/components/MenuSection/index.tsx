import { Buildings, CaretUp } from '@phosphor-icons/react';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuSectionProps } from './interface';

export const MenuSection = ({
  sectionTitle,
  sectionIcon,
  children,
  navigateTo,
  isSectionExtended
}: MenuSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          navigate(navigateTo);
        }}
        className={clsx(
          'bg-blue-600 p-2 w-full flex justify-between items-center',
          {
            'cursor-pointer text-gray-300 hover:text-white': !isSectionExtended,
            'text-white cursor-pointer': isSectionExtended
          }
        )}
      >
        <p className="font-medium text-inherit">{sectionTitle}</p>
        {sectionIcon}
      </div>
      {isSectionExtended && (
        <div className="flex flex-col w-full py-2 gap-2">{children}</div>
      )}
    </div>
  );
};
