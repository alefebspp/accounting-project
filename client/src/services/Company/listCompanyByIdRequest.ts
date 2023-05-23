import api from '../api';
import { Company } from './interface';

export const listCompanyByIdRequest = async (id: string | undefined) => {
  try {
    const { data } = await api.get<Company>(`company/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
