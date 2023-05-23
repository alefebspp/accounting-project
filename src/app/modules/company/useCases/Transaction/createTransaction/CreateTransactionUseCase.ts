import { inject, injectable } from 'tsyringe';
import { ITransactionsRepository } from '../../../repositories/ITransactionsRepository';
import { CreateTransactionDTO } from '../../../dtos/CreateTransactionDTO';

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('PrismaTransactionsRepository')
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(data: CreateTransactionDTO) {
    const transaction = await this.transactionsRepository.create(data);

    return transaction;
  }
}
