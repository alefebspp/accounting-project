import api from '../api';
import { UpdateCompanyRequest } from './interface';

export const updateCompanyRequest = async (
  companyId: string | undefined,
  updateCompanyProps: UpdateCompanyRequest
) => {
  const company = await api.patch(`company/${companyId}`, updateCompanyProps);

  return company;
};
