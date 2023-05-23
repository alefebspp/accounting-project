import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListCompaniesUseCase {
  constructor(
    @inject('PrismaCompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute() {
    const companies = await this.companiesRepository.index();

    return companies;
  }
}
