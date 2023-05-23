import InMemoryCompaniesRepository from '@modules/company/in-memory/InMemoryCompaniesRepository';
import { FindCompanyUseCase } from './FindCompanyUseCase';
import AppError from '@errors/AppError';
import { Company } from '@modules/company/entities/Company';

describe('Find Company', () => {
  let findCompanyUseCase: FindCompanyUseCase;
  let companiesRepository: InMemoryCompaniesRepository;
  beforeEach(() => {
    companiesRepository = new InMemoryCompaniesRepository();
    findCompanyUseCase = new FindCompanyUseCase(companiesRepository);
  });

  it('Should be able to find a company with a id as a parameter', async () => {
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

    const companyFound = await findCompanyUseCase.execute(createdCompany.id);

    expect(companyFound.id).toBe(createdCompany.id);
  });

  it('Should not be able to find a company if company doenst exists', async () => {
    expect(async () => {
      const companyFound = await findCompanyUseCase.execute('fake id');
    }).rejects.toBeInstanceOf(AppError);
  });
});
