import { useParams } from 'react-router-dom';
import { listCompanyByIdRequest } from '../../../services/Company';
import { useEffect, useState } from 'react';
import { Company } from '../../../services/Company/interface';
import { Button, Input } from '../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editCompanySchema } from '../../../util/schemas';

export const EditCompany = () => {
  const { companyId } = useParams();

  const [company, setCompany] = useState<Company>();

  const handleGetCompany = async () => {
    const company = await listCompanyByIdRequest(companyId);

    console.log(company);
    setCompany(company);
  };

  const {
    register,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(editCompanySchema)
  });

  useEffect(() => {
    reset(company);
  }, [company]);

  useEffect(() => {
    handleGetCompany();
  }, []);

  console.log(companyId);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[80%] h-[80%] border border-gray-400 shadow shadow-black rounded-2xl flex justify-between items-center">
        <form
          onSubmit={() => console.log('submited')}
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
              className="border w-[10%] bg-blue-700 text-white hover:opacity-80"
            >
              Editar
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
