import AppError from '@errors/AppError';
import InMemoryCompaniesRepository from '../../../in-memory/InMemoryCompaniesRepository';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';
import { Company } from '@modules/company/entities/Company';

describe('Create Company', () => {
  let createCompanyUseCase: CreateCompanyUseCase;
  let companyRepository: InMemoryCompaniesRepository;

  beforeEach(() => {
    companyRepository = new InMemoryCompaniesRepository();
    createCompanyUseCase = new CreateCompanyUseCase(companyRepository);
  });

  it('Should be able to create a company', async () => {
    const company = {
      cnpj: 'Cnpj test',
      corporate_name: 'Corporate name test',
      fantasy_name: 'Fantasy name test',
      primary_cnae: 'Primary cnae test',
      primary_cnae_description: 'Primary cnae description test',
      foundation_date: new Date(),
      status: 'Status test',
      balance: 0
    };

    await createCompanyUseCase.execute(company);

    const createdCompany = await companyRepository.findByCnpj(company.cnpj);

    expect(createdCompany).toHaveProperty('id');
  });

  it('Should not be able to create company if there is another company with the same cnpj', async () => {
    expect(async () => {
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

      await createCompanyUseCase.execute(company);

      await createCompanyUseCase.execute(company);
    }).rejects.toBeInstanceOf(AppError);
  });
});
