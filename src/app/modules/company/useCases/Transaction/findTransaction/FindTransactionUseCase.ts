import { inject, injectable } from 'tsyringe';
import { ITransactionsRepository } from '../../../repositories/ITransactionsRepository';
import AppError from '@errors/AppError';

@injectable()
class FindTransactionUseCase {
  constructor(
    @inject('PrismaTransactionsRepository')
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(transactionId: string) {
    const transaction = await this.transactionsRepository.find(transactionId);

    if (!transaction) {
      throw new AppError('This company doesnt exists', 400);
    }

    return transaction;
  }
}

export default FindTransactionUseCase;
