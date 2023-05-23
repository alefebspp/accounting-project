import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

export class UpdateCompanyController {
  async handle(request: Request, response: Response) {
    const { companyId } = request.params;
    const {
      cnpj,
      corporate_name,
      fantasy_name,
      primary_cnae,
      primary_cnae_description,
      foundation_date,
      status,
      balance
    } = request.body;

    const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase);

    const company = await updateCompanyUseCase.execute(companyId, {
      cnpj,
      corporate_name,
      fantasy_name,
      primary_cnae,
      primary_cnae_description,
      foundation_date,
      status,
      balance
    });

    return response.json(company);
  }
}
