import api from '../api';
import { CreateTransactionProps } from './interface';

export const createTransactionRequest = async (
  createTransactionData: CreateTransactionProps
) => {
  try {
    const { data } = await api.post('transactions', createTransactionData);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
