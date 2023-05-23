import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO';
import { Transaction } from '@prisma/client';

export interface ITransactionsRepository {
  create(data: CreateTransactionDTO): Promise<Transaction>;
  findByCompanyId(
    company_id: string,
    start_date?: string,
    end_date?: string,
    payment_type?: string
  ): Promise<Transaction[]>;
  find(transaction_id: string): Promise<Transaction>;
  delete(transaction_id: string): Promise<Transaction>;
}
