import * as yup from 'yup';

export const searchCnpjsSchema = yup.object().shape({
  search_cnpj: yup
    .number()
    .typeError('CNPJ é obrigatório')
    .required('CNPJ é obrigatório')
});

export const createCompanySchema = yup.object().shape({
  cnpj: yup.string().required('CNPJ é obrigatório'),
  corporate_name: yup.string().required('Razão social é obrigatório'),
  fantasy_name: yup.string().required('Nome fantasia é obrigatório'),
  primary_cnae: yup.string().required('Código CNAE é obrigatório'),
  primary_cnae_description: yup
    .string()
    .required('Descrição CNAE é obrigatório'),
  foundation_date: yup.string().required('Date de abertura é obrigatório'),
  status: yup.string().required('Status é obrigatório')
});

export const editCompanySchema = yup.object().shape({
  cnpj: yup.string().required('CNPJ é obrigatório'),
  corporate_name: yup.string().required('Razão social é obrigatório'),
  fantasy_name: yup.string().required('Nome fantasia é obrigatório'),
  primary_cnae: yup.string().required('Código CNAE é obrigatório'),
  primary_cnae_description: yup
    .string()
    .required('Descrição CNAE é obrigatório'),
  foundation_date: yup.string().required('Date de abertura é obrigatório'),
  status: yup.string().required('Status é obrigatório')
});

export const createTransactionSchema = yup.object().shape({
  value: yup.number().typeError('Um valor é necessário').required(),
  description: yup.string().required('Descrição é obrigatória'),
  date: yup.string().required('Data é obrigatório'),
  parcels: yup.number().optional(),
  parceled: yup.bool().required('É necessário dizer sé parcelado ou não'),
  finance_type: yup.string().required('Tipo de pagamento é obrigatório'),
  payment_type: yup.string().required('Forma de pagamento é obrigatória')
});
