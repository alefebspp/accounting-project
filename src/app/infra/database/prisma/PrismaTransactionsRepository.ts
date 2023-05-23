import { PrismaClient } from '@prisma/client';
import { ITransactionsRepository } from '../../../modules/company/repositories/ITransactionsRepository';
import { inject, injectable } from 'tsyringe';
import { CreateTransactionDTO } from '../../../modules/company/dtos/CreateTransactionDTO';

@injectable()
export class PrismaTransactionsRepository implements ITransactionsRepository {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient
  ) {}
  async create(createTransactionProps: CreateTransactionDTO) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...createTransactionProps
      }
    });

    return transaction;
  }

  async findByCompanyId(
    company_id: string,
    start_date?: string,
    end_date?: string,
    payment_type?: string
  ) {
    let where = {
      company_id: company_id
    };

    if (start_date && end_date) {
      Object.assign(where, {
        date: {
          gte: new Date(start_date),
          lte: new Date(end_date)
        }
      });
    }
    if (payment_type) {
      Object.assign(where, {
        payment_type: {
          startsWith: payment_type,
          mode: 'insensitive'
        }
      });
    }
    const transactions = await this.prisma.transaction.findMany({
      where,
      orderBy: [
        {
          date: 'asc'
        }
      ]
    });

    return transactions;
  }

  async find(transaction_id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: transaction_id
      }
    });

    return transaction;
  }

  async delete(transaction_id: string) {
    const transaction = await this.prisma.transaction.delete({
      where: {
        id: transaction_id
      }
    });

    return transaction;
  }
}
