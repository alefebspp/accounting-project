import { MenuLayoutProps } from './interface';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { MenuSection } from '../components';
import { Buildings } from '@phosphor-icons/react';

export const MenuLayout = ({}: MenuLayoutProps) => {
  const { pathname } = useLocation();

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div className="w-[20%] flex flex-col gap-4 bg-blue-400 shadow-lg shadow-black p-4">
        <MenuSection
          isSectionExtended={pathname.includes('/companies')}
          navigateTo="/companies/management"
          sectionTitle="Empresas"
          sectionIcon={
            <Buildings className="text-inherit" size={20} weight="fill" />
          }
        >
          <div className="bg-white rounded-lg w-full p-2">
            <Link
              className="text-blue-600 font-medium hover:opacity-90"
              to={'companies/register'}
            >
              Regitrar empresa
            </Link>
          </div>
        </MenuSection>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};
