export interface CompanyProps {
  cnpj: string;
  corporate_name: string;
  fantasy_name: string;
  primary_cnae: string;
  primary_cnae_description: string;
  foundation_date: Date;
  status: string;
  balance: number;
}

export interface TransactionProps {
  value: number;
  description: string;
  date: Date;
  company_id: string;
  parcels: number;
  type: string;
  payment_type: string;
  finance_type: string;
}
