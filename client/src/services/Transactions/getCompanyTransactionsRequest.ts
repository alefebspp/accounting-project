import api from "../api";

export const getCompanyTransactionsRequest = async (
  companyId: string | undefined,
  queryParam: string | undefined = ""
) => {
  try {
    const { data } = await api.get(
      `transactions/all/${companyId}${queryParam}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
