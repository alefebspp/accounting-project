import { container } from 'tsyringe';
import { ICompaniesRepository } from '@modules/company/repositories/ICompaniesRepository';
import { PrismaCompaniesRepository } from 'src/app/infra/database/prisma/PrismaCompaniesRepository';
import { PrismaClient } from '@prisma/client';
import prisma from '../../../prisma';
import { ITransactionsRepository } from '@modules/company/repositories/ITransactionsRepository';
import { PrismaTransactionsRepository } from 'src/app/infra/database/prisma/PrismaTransactionsRepository';

container.register<PrismaClient>('PrismaClient', {
  useValue: prisma
});

container.registerSingleton<ICompaniesRepository>(
  'PrismaCompaniesRepository',
  PrismaCompaniesRepository
);

container.registerSingleton<ITransactionsRepository>(
  'PrismaTransactionsRepository',
  PrismaTransactionsRepository
);
