import { Outlet } from 'react-router-dom';

export const Companies = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-[10%] w-full border-b border-gray-400 flex items-end justify-center">
        <p className="font-bold">EMPRESAS</p>
      </div>
      <Outlet />
    </div>
  );
};
