import api from '../api';

export const listCompaniesRequest = async () => {
  try {
    const { data } = await api.get('company');

    return data;
  } catch (error) {
    console.log(error);
  }
};
