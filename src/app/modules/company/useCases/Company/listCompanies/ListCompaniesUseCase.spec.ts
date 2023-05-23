import InMemoryCompaniesRepository from '@modules/company/in-memory/InMemoryCompaniesRepository';
import { ListCompaniesUseCase } from './ListCompaniesUseCase';
import { Company } from '@modules/company/entities/Company';

describe('List all companies', () => {
  let companiesRepository: InMemoryCompaniesRepository;
  let listCompaniesUseCase: ListCompaniesUseCase;

  beforeEach(() => {
    companiesRepository = new InMemoryCompaniesRepository();
    listCompaniesUseCase = new ListCompaniesUseCase(companiesRepository);
  });

  it('Should be able to list all created companies', async () => {
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

    await companiesRepository.create(company);

    const companies = await listCompaniesUseCase.execute();

    expect(companies).not.toHaveLength(0);
  });
});
