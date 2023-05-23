import { Request, Response } from 'express';
import DeleteTransactionUseCase from './DeleteTransactionUseCase';
import { container } from 'tsyringe';

class DeleteTransactionController {
  async handle(request: Request, response: Response) {
    const { transactionId } = request.params;

    const deleteTransactionUseCase = container.resolve(
      DeleteTransactionUseCase
    );

    const transaction = await deleteTransactionUseCase.execute(transactionId);

    return response.json(transaction);
  }
}

export default DeleteTransactionController;
