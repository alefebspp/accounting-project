import api from '../api';
import { Transaction } from './interface';

export const findTransactionRequest = async (
  transaction_id: string | undefined
): Promise<Transaction> => {
  try {
    const { data } = await api.get(`transactions/${transaction_id}`);

    return data;
  } catch (error) {
    return Promise.reject(console.log(error));
  }
};
