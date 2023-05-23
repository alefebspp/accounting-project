import { inject, injectable } from 'tsyringe';
import { ITransactionsRepository } from '../../../repositories/ITransactionsRepository';
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository';

@injectable()
class FindTransactionsByCompanyIdUseCase {
  constructor(
    @inject('PrismaTransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('PrismaCompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(
    companyId: string,
    start_date?: string,
    end_date?: string,
    payment_type?: string
  ) {
    const company = await this.companiesRepository.find(companyId);

    const transactions = await this.transactionsRepository.findByCompanyId(
      company.id,
      start_date,
      end_date,
      payment_type
    );

    return transactions;
  }
}

export default FindTransactionsByCompanyIdUseCase;
