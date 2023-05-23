import { Transaction } from '@prisma/client';
import { CreateTransactionDTO } from '../dtos/CreateTransactionDTO';
import { ITransactionsRepository } from '../repositories/ITransactionsRepository';
import { randomUUID } from 'node:crypto';

class InMemoryTransactionsRepository implements ITransactionsRepository {
  public transactions: Transaction[] = [];

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const transaction = <Transaction>{};

    Object.assign(transaction, {
      id: randomUUID(),
      value: data.value,
      description: data.description,
      date: data.date,
      company_id: data.company_id,
      parcels: data.parcels,
      type: data.type,
      payment_type: data.payment_type,
      finance_type: data.finance_type
    });

    this.transactions.push(transaction);
    return transaction;
  }
  async findByCompanyId(
    company_id: string,
    start_date?: string,
    end_date?: string,
    payment_type?: string
  ): Promise<Transaction[]> {
    const transactions = this.transactions.filter(transaction => {
      if ((start_date && end_date) || payment_type) {
        const transactionDate = new Date(transaction.date);
        const startDate = start_date ? new Date(start_date) : null;
        const endDate = end_date ? new Date(end_date) : null;

        const isWithinDateRange =
          (!startDate || transactionDate >= startDate) &&
          (!endDate || transactionDate <= endDate);

        const matchesPaymentType =
          !payment_type || transaction.payment_type === payment_type;

        return (
          transaction.company_id === company_id &&
          isWithinDateRange &&
          matchesPaymentType
        );
        // Adicione aqui a lógica para outros parâmetros de filtragem
      }
      return transaction.company_id == company_id;
    });

    return transactions;
  }
  find(transaction_id: string): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
  delete(transaction_id: string): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
}

export default InMemoryTransactionsRepository;
