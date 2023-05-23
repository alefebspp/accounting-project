import api from '../api';

export const deleteTransactionRequest = async (
  transaction_id: string | undefined
) => {
  try {
    const { data } = await api.delete(`transactions/${transaction_id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
