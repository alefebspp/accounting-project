export interface FinanceTableProps {
  companyId: string | undefined;
}

export interface Transaction {
  company_id: string;
  date: string;
  description: string;
  parcels: number;
  value: number;
  id: string;
  type: string;
  finance_type: string;
  payment_type: string;
}
