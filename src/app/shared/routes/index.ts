import { Router } from 'express';
import companiesRoutes from './company.routes';
import transactionsRoutes from './transactions.routes';

const routes = Router();

routes.use('/company', companiesRoutes);
routes.use('/transactions', transactionsRoutes);

export default routes;
