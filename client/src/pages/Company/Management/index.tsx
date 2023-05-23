import { useEffect, useState } from 'react';
import {
  listCompaniesRequest,
  deleteCompanyRequest
} from '../../../services/Company';
import { Company } from '../../../services/Company/interface';
import { NotePencil, Trash, ChartBar } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export const CompaniesManagement = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);

  const handleListCompaniesRequest = async () => {
    const companies = await listCompaniesRequest();

    setCompanies(companies);
  };

  useEffect(() => {
    handleListCompaniesRequest();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-2 p-2">
      <div className="overflow-x-auto w-full">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Empresa</th>
              <th className="px-4 py-2 text-left">Saldo</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map(company => (
              <tr key={company.id} className="border-b">
                <td className="px-4 py-2">{company.fantasy_name}</td>
                <td className="px-4 py-2">{company.balance}</td>
                <td className="px-4 py-2 flex gap-4">
                  <NotePencil
                    onClick={() => navigate(`/companies/edit/${company.id}`)}
                    size={20}
                    weight="bold"
                    className="text-gray-800 cursor-pointer fill-current hover:opacity-80"
                  />
                  <Trash
                    onClick={() => deleteCompanyRequest(company.id)}
                    size={20}
                    weight="bold"
                    className="text-red-500 cursor-pointer fill-current hover:opacity-80"
                  />
                  <ChartBar
                    onClick={() => navigate(`/companies/finance/${company.id}`)}
                    size={20}
                    weight="regular"
                    className="text-blue-500 fill-current cursor-pointer hover:opacity-80"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {companies?.map(company => (
        <div
          key={company.id}
          className="bg-blue-400 w-full flex items-center gap-2"
        >
          <p>{`${company.fantasy_name} - ${company.status}`}</p>
          <div className="flex items-center gap-2">
            <NotePencil
              onClick={() => navigate(`/companies/edit/${company.id}`)}
              size={20}
              weight="bold"
              className="text-white cursor-pointer fill-current hover:opacity-80"
            />
            <Trash
              onClick={() => deleteCompanyRequest(company.id)}
              size={20}
              weight="bold"
              className="text-red-500 cursor-pointer fill-current hover:opacity-80"
            />
            <CurrencyCircleDollar
              onClick={() => navigate(`/companies/finance/${company.id}`)}
              size={20}
              weight="fill"
              className="text-yellow-500 fill-current cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      ))} */}
    </div>
  );
};
