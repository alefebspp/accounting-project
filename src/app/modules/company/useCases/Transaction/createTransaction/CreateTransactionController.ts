import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const {
      value,
      description,
      date,
      company_id,
      parcels,
      type,
      payment_type,
      finance_type
    } = request.body;

    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase
    );

    const transaction = await createTransactionUseCase.execute({
      value,
      description,
      date,
      company_id,
      parcels,
      type,
      payment_type,
      finance_type
    });

    return response.json(transaction);
  }
}
