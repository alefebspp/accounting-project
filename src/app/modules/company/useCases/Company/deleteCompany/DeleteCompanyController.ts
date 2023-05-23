import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteCompanyUseCase } from './DeleteCompanyUseCase';

export class DeleteCompanyController {
  async handle(request: Request, response: Response) {
    const { companyId } = request.params;

    const deleteCompanyUseCase = container.resolve(DeleteCompanyUseCase);

    await deleteCompanyUseCase.execute(companyId);

    return response.json({
      message: 'Company Deleted!'
    });
  }
}
