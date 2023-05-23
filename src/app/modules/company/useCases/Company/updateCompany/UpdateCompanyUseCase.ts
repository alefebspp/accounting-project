import { inject, injectable } from 'tsyringe';
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';
import { UpdateCompanyRequestDTO } from '../../../dtos/UpdateCompanyDTO';
import AppError from '@errors/AppError';

@injectable()
export class UpdateCompanyUseCase {
  constructor(
    @inject('PrismaCompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(companyId: string, data: UpdateCompanyRequestDTO) {
    const company = await this.companiesRepository.find(companyId);

    if (!company) {
      throw new AppError('Company doesnt exists', 400);
    }

    const updatedCompany = await this.companiesRepository.update(
      companyId,
      data
    );

    return updatedCompany;
  }
}
