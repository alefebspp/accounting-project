import api from '../api';

export const deleteCompanyRequest = async (id: string) => {
  try {
    const { data } = await api.delete(`company/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
