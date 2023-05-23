import { useParams } from 'react-router-dom';
import { FinanceTable } from './FinanceTable';

export const CompanyFinance = () => {
  const { companyId } = useParams();

  return (
    <div className="w-full h-full flex justify-start items-start">
      <FinanceTable companyId={companyId} />
    </div>
  );
};
