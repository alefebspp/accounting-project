import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';
import AppError from '@errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteCompanyUseCase {
  constructor(
    @inject('PrismaCompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(companyId: string) {
    const companyAlreadyExists = await this.companiesRepository.find(companyId);

    if (!companyAlreadyExists) {
      throw new AppError(`Company with id ${companyId} doenst exists`, 400);
    }

    const company = await this.companiesRepository.delete(companyId);
  }
}
