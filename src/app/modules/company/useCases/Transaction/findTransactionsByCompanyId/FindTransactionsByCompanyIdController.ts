import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindTransactionsByCompanyIdUseCase from './FindTransactionsByCompanyIdUseCase';

class FindTransactionsByCompanyIdController {
  async handle(request: Request, response: Response) {
    const { companyId } = request.params;
    const { start_date, end_date, payment_type } = request.query;

    const findTransactionByCompanyIdUseCase = container.resolve(
      FindTransactionsByCompanyIdUseCase
    );

    const transactions = await findTransactionByCompanyIdUseCase.execute(
      companyId,
      start_date as string,
      end_date as string,
      payment_type as string
    );

    return response.json(transactions);
  }
}

export default FindTransactionsByCompanyIdController;
