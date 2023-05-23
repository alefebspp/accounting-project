import { Router } from 'express';
import { CreateTransactionController } from '@modules/company/useCases/Transaction/createTransaction/CreateTransactionController';
import DeleteTransactionController from '@modules/company/useCases/Transaction/deleteTransaction/DeleteTransactionController';
import FindTransactionController from '@modules/company/useCases/Transaction/findTransaction/FindTransactionController';
import FindTransactionsByCompanyIdController from '@modules/company/useCases/Transaction/findTransactionsByCompanyId/FindTransactionsByCompanyIdController';
import TransactionsToTxtController from '@modules/company/useCases/Transaction/transactionsToTxt/TransactionsToTxtController';

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const findTransactionController = new FindTransactionController();
const findTransactionsByCompanyIdController =
  new FindTransactionsByCompanyIdController();
const transactionsToTxtController = new TransactionsToTxtController();

transactionsRoutes.post('/', createTransactionController.handle);
transactionsRoutes.get(
  '/all/:companyId',
  findTransactionsByCompanyIdController.handle
);
transactionsRoutes.delete(
  '/:transactionId',
  deleteTransactionController.handle
);
transactionsRoutes.get('/:transactionId', findTransactionController.handle);
transactionsRoutes.post('/txt', transactionsToTxtController.handle);

export default transactionsRoutes;
