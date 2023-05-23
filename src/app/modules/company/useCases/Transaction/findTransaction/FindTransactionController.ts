import { Request, Response } from 'express';
import FindTransactionUseCase from './FindTransactionUseCase';
import { container } from 'tsyringe';

class FindTransactionController {
  async handle(request: Request, response: Response) {
    const { transactionId } = request.params;

    const findTransactionUseCase = container.resolve(FindTransactionUseCase);

    const transaction = await findTransactionUseCase.execute(transactionId);

    return response.json(transaction);
  }
}

export default FindTransactionController;
