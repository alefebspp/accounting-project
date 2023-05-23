import { CreateCompanyRequestDTO } from '../dtos/CreateCompanyDTO';
import { Company } from '@prisma/client';
import { UpdateCompanyRequestDTO } from '../dtos/UpdateCompanyDTO';

export interface ICompaniesRepository {
  create(data: CreateCompanyRequestDTO): Promise<Company>;
  find(companyId: string): Promise<Company>;
  findByCnpj(companyCnpj: string): Promise<Company>;
  index(): Promise<Company[]>;
  delete(companyId: string): Promise<void>;
  update(companyId: string, data: UpdateCompanyRequestDTO): Promise<Company>;
}
