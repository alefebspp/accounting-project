import axios from 'axios';
import { Input, Button } from '../../../components';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCompanySchema, searchCnpjsSchema } from '../../../util/schemas';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { APICNPJProps } from './interface';
import { createCompanyRequest } from '../../../services/Company';
import { transformDate } from '../../../util/transformDate';

export const RegisterCompany = () => {
  const [CNPJInfo, setCNPJInfo] = useState<APICNPJProps>();

  const getCompany = async ({ search_cnpj }: FieldValues) => {
    const { data } = await axios.get(
      `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${search_cnpj}`
    );

    console.log(data);

    setCNPJInfo(data);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(createCompanySchema)
  });

  useEffect(() => {
    if (CNPJInfo) {
      setValue('cnpj', CNPJInfo.CNPJ);
      setValue('corporate_name', CNPJInfo['RAZAO SOCIAL']);
      setValue('fantasy_name', CNPJInfo['NOME FANTASIA']);
      setValue('primary_cnae', CNPJInfo['CNAE PRINCIPAL CODIGO']);
      setValue(
        'primary_cnae_description',
        CNPJInfo['CNAE PRINCIPAL DESCRICAO']
      );
      setValue('foundation_date', CNPJInfo['DATA ABERTURA']);
      setValue('status', CNPJInfo.STATUS);
    }
  }, [CNPJInfo]);

  const {
    register: registerCNPJ,
    formState: { errors: CNPJErrors },
    handleSubmit: SubmitCNPJ
  } = useForm({
    resolver: yupResolver(searchCnpjsSchema)
  });

  return (
    <div className=" w-full h-full flex flex-col items-center justify-start">
      <form
        onSubmit={SubmitCNPJ(getCompany)}
        className="flex justify-start p-2 items-center gap-2 w-[80%]"
      >
        <p className="font-medium">Pesquise sua empresa pelo CNPJ:</p>
        <div className="flex justify-center items-end gap-4">
          <div className="flex flex-col">
            <Input
              type="number"
              inputName="search_cnpj"
              register={registerCNPJ}
            />
          </div>
          <Button className="border border-gray-400 h-8 w-8 flex justify-center items-center rounded-lg">
            <MagnifyingGlass />
          </Button>
          {CNPJErrors.search_cnpj?.message && (
            <span className="text-red-600 font-medium">
              {CNPJErrors.search_cnpj.message.toString()}
            </span>
          )}
        </div>
      </form>
      <div className="w-[80%] h-[80%] border border-gray-400 shadow shadow-black rounded-2xl flex justify-between items-center">
        <form
          onSubmit={handleSubmit(data => {
            createCompanyRequest({
              ...data,
              foundation_date: transformDate(data.foundation_date)
            });
            reset();
          })}
          className="w-full p-4 h-full flex flex-col justify-evenly"
        >
          <div className="flex flex-col">
            <Input
              inputLabel="Razão Social"
              register={register}
              inputName="corporate_name"
            />
            {errors.corporate_name?.message && (
              <span className="text-red-600 font-medium">
                {errors.corporate_name.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              inputLabel="Nome Fantasia"
              register={register}
              inputName="fantasy_name"
            />
            {errors.fantasy_name?.message && (
              <span className="text-red-600 font-medium">
                {errors.fantasy_name.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input inputLabel="CNPJ" register={register} inputName="cnpj" />
            {errors.cnpj?.message && (
              <span className="text-red-600 font-medium">
                {errors.cnpj.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              inputLabel="Principal Códico CNAE"
              register={register}
              inputName="primary_cnae"
            />
            {errors.primary_cnae?.message && (
              <span className="text-red-600 font-medium">
                {errors.primary_cnae.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              inputLabel="Principal Descrição CNAE"
              register={register}
              inputName="primary_cnae_description"
            />
            {errors.primary_cnae_description?.message && (
              <span className="text-red-600 font-medium">
                {errors.primary_cnae_description.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              inputLabel="Data de abertura"
              register={register}
              inputName="foundation_date"
            />
            {errors.foundation_date?.message && (
              <span className="text-red-600 font-medium">
                {errors.foundation_date.message.toString()}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Input inputLabel="Status" register={register} inputName="status" />
            {errors.status?.message && (
              <span className="text-red-600 font-medium">
                {errors.status.message.toString()}
              </span>
            )}
          </div>

          <div className="w-full flex justify-center items-center">
            <Button
              type="submit"
              className="border w-[10%] bg-green-700 text-white hover:opacity-80"
            >
              Criar
            </Button>
          </div>
          {/* <Input inputLabel="Email" register={register} inputName="email" />
          <Input inputLabel="DDD" register={register} inputName="ddd" /> */}
        </form>
        {/* <div className="w-full p-4 h-full flex flex-col justify-evenly">
          <Input
            inputLabel="Logradouro"
            register={register}
            inputName="logradouro"
          />
          <Input
            inputLabel="Tipo de Logradouro"
            register={register}
            inputName="tipo_logradouro"
          />
          <Input inputLabel="Numero" register={register} inputName="number" />
          <Input inputLabel="Bairro" register={register} inputName="bairro" />

          <Input
            inputLabel="Municipio"
            register={register}
            inputName="municipio"
          />
          <Input inputLabel="UF" register={register} inputName="uf" />
          <Input inputLabel="CEP" register={register} inputName="cep" />
          <Input
            inputLabel="Complemento"
            register={register}
            inputName="complemento"
          />
          <Input inputLabel="Telefone" register={register} inputName="phone" />
        </div> */}
      </div>
    </div>
  );
};
