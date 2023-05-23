import { Company } from '@prisma/client';
import { CreateCompanyRequestDTO } from '../dtos/CreateCompanyDTO';
import { UpdateCompanyRequestDTO } from '../dtos/UpdateCompanyDTO';
import { ICompaniesRepository } from '../repositories/ICompaniesRepository';
import { randomUUID } from 'node:crypto';

class InMemoryCompaniesRepository implements ICompaniesRepository {
  companies: Company[] = [];

  async create(data: CreateCompanyRequestDTO): Promise<Company> {
    const company = <Company>{};
    Object.assign(company, {
      id: randomUUID(),
      cnpj: data.cnpj,
      corporate_name: data.corporate_name,
      fantasy_name: data.fantasy_name,
      primary_cnae: data.primary_cnae,
      primary_cnae_description: data.primary_cnae_description,
      foundation_date: data.foundation_date,
      status: data.status,
      balance: data.balance
    });

    this.companies.push(company);
    return company;
  }
  async find(companyId: string): Promise<Company> {
    const company = this.companies.find(company => company.id == companyId);

    return company;
  }
  async findByCnpj(companyCnpj: string): Promise<Company> {
    const company = this.companies.find(company => company.cnpj == companyCnpj);

    return company;
  }
  async index(): Promise<Company[]> {
    return this.companies;
  }
  async delete(companyId: string): Promise<void> {
    const company = this.companies.find(company => company.id == companyId);

    const companyIndex = this.companies.indexOf(company);

    this.companies.splice(companyIndex, 1);
  }
  async update(
    companyId: string,
    data: UpdateCompanyRequestDTO
  ): Promise<Company> {
    const company = this.companies.find(company => company.id == companyId);

    Object.assign(company, {
      balance: data.balance ?? company.balance,
      cnpj: data.cnpj ?? company.cnpj,
      corporate_name: data.corporate_name ?? company.corporate_name,
      fantasy_name: data.fantasy_name ?? company.fantasy_name,
      foundation_date: data.foundation_date ?? company.foundation_date,
      primary_cnae: data.primary_cnae ?? company.primary_cnae,
      primary_cnae_description:
        data.primary_cnae_description ?? company.primary_cnae_description,
      status: data.status ?? company.status
    });

    return company;
  }
}

export default InMemoryCompaniesRepository;
