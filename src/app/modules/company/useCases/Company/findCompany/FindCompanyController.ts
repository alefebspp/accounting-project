import { Request, Response } from 'express';
import { FindCompanyUseCase } from './FindCompanyUseCase';
import { container } from 'tsyringe';

export class FindCompanyController {
  async handle(request: Request, response: Response) {
    const { companyId } = request.params;

    const findCompanyUseCase = container.resolve(FindCompanyUseCase);

    const company = await findCompanyUseCase.execute(companyId);

    return response.json(company);
  }
}
