import { Response, Request } from 'express';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';
import { container } from 'tsyringe';

export class CreateCompanyController {
  async handle(request: Request, response: Response) {
    const {
      cnpj,
      corporate_name,
      fantasy_name,
      primary_cnae,
      primary_cnae_description,
      foundation_date,
      status
    } = request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const company = await createCompanyUseCase.execute({
      cnpj,
      corporate_name,
      fantasy_name,
      primary_cnae,
      primary_cnae_description,
      foundation_date,
      status,
      balance: 0
    });

    return response.json(company);
  }
}
