import { FieldValues } from 'react-hook-form';
import api from '../api';
import { Company } from './interface';

export const createCompanyRequest = async (
  companyData: FieldValues
): Promise<void> => {
  try {
    const { data } = await api.post('company', companyData);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
