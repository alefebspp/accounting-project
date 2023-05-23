import { Router } from 'express';
import { CreateCompanyController } from '@modules/company/useCases/Company/createCompany/CreateCompanyController';
import { ListCompaniesController } from '@modules/company/useCases/Company/listCompanies/ListCompaniesController';
import { FindCompanyController } from '@modules/company/useCases/Company/findCompany/FindCompanyController';
import { DeleteCompanyController } from '@modules/company/useCases/Company/deleteCompany/DeleteCompanyController';
import { UpdateCompanyController } from '@modules/company/useCases/Company/updateCompany/UpdateCompanyController';

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();
const listCompaniesController = new ListCompaniesController();
const findCompanyController = new FindCompanyController();
const deleteCompanyController = new DeleteCompanyController();
const updateCompanyController = new UpdateCompanyController();

companiesRoutes.post('/', createCompanyController.handle);
companiesRoutes.get('/', listCompaniesController.handle);
companiesRoutes.get('/:companyId', findCompanyController.handle);
companiesRoutes.delete('/:companyId', deleteCompanyController.handle);
companiesRoutes.patch('/:companyId', updateCompanyController.handle);

export default companiesRoutes;
