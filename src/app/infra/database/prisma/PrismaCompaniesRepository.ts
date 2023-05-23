import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ICompaniesRepository } from '../../../modules/company/repositories/ICompaniesRepository';
import { CreateCompanyRequestDTO } from '../../../modules/company/dtos/CreateCompanyDTO';
import { UpdateCompanyRequestDTO } from '../../../modules/company/dtos/UpdateCompanyDTO';

@injectable()
export class PrismaCompaniesRepository implements ICompaniesRepository {
  constructor(
    @inject('PrismaClient')
    private readonly prisma: PrismaClient
  ) {}

  async create(companyProps: CreateCompanyRequestDTO) {
    const company = await this.prisma.company.create({
      data: {
        ...companyProps
      }
    });
    return company;
  }

  async find(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId }
    });

    return company;
  }

  async findByCnpj(companyCnpj: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        cnpj: companyCnpj
      }
    });
    return company;
  }

  async update(companyId: string, updateCompanyProps: UpdateCompanyRequestDTO) {
    const company = await this.prisma.company.update({
      where: {
        id: companyId
      },
      data: {
        ...updateCompanyProps
      }
    });

    return company;
  }

  async index() {
    const companies = await this.prisma.company.findMany();

    return companies;
  }

  async delete(companyId: string) {
    const company = await this.prisma.company.delete({
      where: {
        id: companyId
      }
    });
  }
}
