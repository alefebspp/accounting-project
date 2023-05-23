import { createBrowserRouter } from 'react-router-dom';
import { MenuLayout } from '../layout/Menu';
import {
  CompaniesManagement,
  RegisterCompany,
  Companies,
  EditCompany,
  CompanyFinance
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuLayout />,
    children: [
      {
        path: 'companies',
        element: <Companies />,
        children: [
          {
            path: 'register',
            element: <RegisterCompany />
          },
          {
            path: 'management',
            element: <CompaniesManagement />
          },
          {
            path: 'edit/:companyId',
            element: <EditCompany />
          },
          {
            path: 'finance/:companyId',
            element: <CompanyFinance />
          }
        ]
      }
    ]
  }
]);

export default router;
