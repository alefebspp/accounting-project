import { inject, injectable } from 'tsyringe';
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';
import AppError from '@errors/AppError';

@injectable()
export class FindCompanyUseCase {
  constructor(
    @inject('PrismaCompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}
  async execute(companyId: string) {
    const company = await this.companiesRepository.find(companyId);

    if (!company) {
      throw new AppError('Company with the informed id doenst exists', 400);
    }

    return company;
  }
}
