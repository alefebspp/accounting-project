import InMemoryCompaniesRepository from '@modules/company/in-memory/InMemoryCompaniesRepository';
import { DeleteCompanyUseCase } from './DeleteCompanyUseCase';
import AppError from '@errors/AppError';
import { Company } from '@modules/company/entities/Company';

describe('Delete Company', () => {
  let companiesRepository: InMemoryCompaniesRepository;
  let deleteCompanyUseCase: DeleteCompanyUseCase;

  beforeEach(() => {
    companiesRepository = new InMemoryCompaniesRepository();
    deleteCompanyUseCase = new DeleteCompanyUseCase(companiesRepository);
  });

  it('Should be able to delete a company', async () => {
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

    await deleteCompanyUseCase.execute(createdCompany.id);

    const companies = await companiesRepository.index();

    const isCompanyDeleted = companies.find(
      company => company.id == createdCompany.id
    );

    expect(isCompanyDeleted).toBe(undefined);
  });

  it('Should not be able to delete company if company doesnt exists', async () => {
    expect(async () => {
      await deleteCompanyUseCase.execute('fakeId');
    }).rejects.toBeInstanceOf(AppError);
  });
});
