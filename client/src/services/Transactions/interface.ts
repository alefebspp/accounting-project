export interface CreateTransactionProps {
  value: number;
  description: string;
  date: Date | string;
  company_id: string | undefined;
  parcels: number;
  type: string | undefined;
  parceled: boolean;
  finance_type: string;
  payment_type: string;
}

export interface Transaction {
  company_id: string;
  date: string | Date;
  description: string;
  parcels: number;
  value: number;
  id: string;
  type: string;
  finance_type: string;
  payment_type: string;
}
