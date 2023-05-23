import api from '../api';
import { Transaction } from './interface';

export const transformTransactionsToTxtRequest = async (
  transactions: Transaction[]
) => {
  try {
    const { data } = await api.post('transactions/txt', { transactions });

    return data;
  } catch (error) {
    console.log(error);
  }
};
