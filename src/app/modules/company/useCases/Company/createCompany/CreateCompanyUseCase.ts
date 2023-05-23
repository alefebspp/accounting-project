import AppError from '@errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';
import { CreateCompanyRequestDTO } from '../../../dtos/CreateCompanyDTO';

@injectable()
export class CreateCompanyUseCase {
  constructor(
    @inject('PrismaCompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(data: CreateCompanyRequestDTO) {
    const companyAlreadyExists = await this.companiesRepository.findByCnpj(
      data.cnpj
    );

    if (companyAlreadyExists) {
      throw new AppError('Company with this cnpj alreay exists', 400);
    }

    const company = await this.companiesRepository.create(data);

    return company;
  }
}
