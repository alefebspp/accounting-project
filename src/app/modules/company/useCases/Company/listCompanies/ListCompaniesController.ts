import { Request, Response, response } from 'express';
import { container } from 'tsyringe';
import { ListCompaniesUseCase } from './ListCompaniesUseCase';

export class ListCompaniesController {
  async handle(request: Request, response: Response) {
    const listCompaniesUseCase = container.resolve(ListCompaniesUseCase);

    const companies = await listCompaniesUseCase.execute();

    return response.json(companies);
  }
}
