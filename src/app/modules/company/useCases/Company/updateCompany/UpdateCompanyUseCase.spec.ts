import InMemoryCompaniesRepository from '@modules/company/in-memory/InMemoryCompaniesRepository';
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

describe('Update company', () => {
  let companiesRepository: InMemoryCompaniesRepository;
  let updateCompanyUseCase: UpdateCompanyUseCase;
  beforeEach(() => {
    companiesRepository = new InMemoryCompaniesRepository();
    updateCompanyUseCase = new UpdateCompanyUseCase(companiesRepository);
  });

  it('should be able to update a company', async () => {
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

    const createdCompany = await companiesRepository.create(company);

    await updateCompanyUseCase.execute(createdCompany.id, {
      cnpj: 'Updated Cnpj test'
    });

    const updateCompany = await companiesRepository.find(createdCompany.id);

    expect(createdCompany.cnpj).not.toBe('Cnpj test');
  });
});
