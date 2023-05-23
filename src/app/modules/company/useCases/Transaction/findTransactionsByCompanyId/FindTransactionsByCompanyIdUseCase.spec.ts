import InMemoryTransactionsRepository from '@modules/company/in-memory/InMemoryTransactionsRepository';
import FindTransactionsByCompanyIdUseCase from './FindTransactionsByCompanyIdUseCase';
import InMemoryCompaniesRepository from '@modules/company/in-memory/InMemoryCompaniesRepository';
import { Company } from '@modules/company/entities/Company';
import { Transaction } from '@modules/company/entities/Transaction';

describe('Find transactions by company id', () => {
  let transactionsRepository: InMemoryTransactionsRepository;
  let companiesRepository: InMemoryCompaniesRepository;
  let findByCompanyId: FindTransactionsByCompanyIdUseCase;

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    companiesRepository = new InMemoryCompaniesRepository();
    findByCompanyId = new FindTransactionsByCompanyIdUseCase(
      transactionsRepository,
      companiesRepository
    );
  });

  it('should be able to find transactions of a specific company', async () => {
    const company = new Company({
      cnpj: 'Cnpj test',
      corporate_name: 'Corporate name test',
      fantasy_name: 'Fantasy name test',
      primary_cnae: 'Primary cnae test',
      primary_cnae_description: 'Primary cnae description test',
      foundation_date: new Date(),
      status: 'Status test',
      balance: 0
    });

    const createdCompany = await companiesRepository.create(company);

    const transaction = new Transaction({
      value: 500,
      description: 'transaction',
      date: new Date(),
      company_id: createdCompany.id,
      parcels: 0,
      type: 'income',
      payment_type: 'payment_type',
      finance_type: 'finance_type'
    });

    const createdTransaction = await transactionsRepository.create(transaction);

    const companyTransactions = await findByCompanyId.execute(
      createdCompany.id
    );
    expect(transactionsRepository.transactions[0]).toEqual(
      companyTransactions[0]
    );
  });

  it('should be able to find transactions of a specific company with a date range', async () => {
    const company = new Company({
      cnpj: 'Cnpj test',
      corporate_name: 'Corporate name test',
      fantasy_name: 'Fantasy name test',
      primary_cnae: 'Primary cnae test',
      primary_cnae_description: 'Primary cnae description test',
      foundation_date: new Date(),
      status: 'Status test',
      balance: 0
    });

    const createdCompany = await companiesRepository.create(company);

    const transaction = new Transaction({
      value: 500,
      description: 'transaction',
      date: new Date(),
      company_id: createdCompany.id,
      parcels: 0,
      type: 'income',
      payment_type: 'payment_type',
      finance_type: 'finance_type'
    });

    const secondTransaction = new Transaction({
      value: 500,
      date: new Date('2023/02/01'),
      description: 'transaction 2',
      company_id: createdCompany.id,
      parcels: 0,
      type: 'income',
      payment_type: 'payment_type',
      finance_type: 'finance_type'
    });

    const createdTransaction = await transactionsRepository.create(transaction);
    await transactionsRepository.create(secondTransaction);

    const companyTransactions = await findByCompanyId.execute(
      createdCompany.id,
      '2023/02/01',
      '2023/02/28'
    );
    expect(companyTransactions).toHaveLength(1);
  });
});
