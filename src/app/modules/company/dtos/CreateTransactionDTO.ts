export interface CreateTransactionDTO {
  value: number;
  description: string;
  date: Date;
  company_id: string;
  parcels?: number;
  type: string;
  payment_type: string;
  finance_type: string;
}
