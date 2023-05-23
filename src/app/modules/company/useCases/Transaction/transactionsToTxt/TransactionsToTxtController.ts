import { Request, Response } from 'express';
import TransactionsToTxtUseCase from './TransactionsToTxtUseCase';

class TransactionsToTxtController {
  async handle(request: Request, response: Response) {
    const { transactions } = request.body;

    const transactionsToTxt = new TransactionsToTxtUseCase();

    const file = transactionsToTxt.execute(transactions);

    return response.download('text.txt');
  }
}

export default TransactionsToTxtController;
