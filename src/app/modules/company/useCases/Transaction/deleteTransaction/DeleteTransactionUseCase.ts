import { inject, injectable } from 'tsyringe';
import { ITransactionsRepository } from '../../../repositories/ITransactionsRepository';
import AppError from '@errors/AppError';

@injectable()
class DeleteTransactionUseCase {
  constructor(
    @inject('PrismaTransactionsRepository')
    private transactionsRepository: ITransactionsRepository
  ) {}

  async execute(transactionId: string) {
    const transaction = await this.transactionsRepository.find(transactionId);

    if (!transaction) {
      throw new AppError('The target transaction doesnt exists', 400);
    }

    const toBeDeletedTransaction = await this.transactionsRepository.delete(
      transactionId
    );

    return toBeDeletedTransaction;
  }
}

export default DeleteTransactionUseCase;
