import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { TransactionModalProps } from "./interface";
import { ArrowLeft, ChartLineDown, ChartLineUp } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  CreateTransactionProps,
  Transaction,
} from "../../services/Transactions/interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTransactionSchema } from "../../util/schemas";
import {
  createTransactionRequest,
  findTransactionRequest,
} from "../../services/Transactions";
import { transformDate } from "../../util/transformDate";
import {
  listCompanyByIdRequest,
  updateCompanyRequest,
} from "../../services/Company";
import { Button, Input, DateInput, SelectComponent } from "../index";
import {
  isParceledOptions,
  paymentOptions,
  typesOptions,
} from "../../pages/Company/Management/Finances/selectOptions";

export const TransactionModal = ({
  children,
  transactionType,
  companyId,
  transactionId,
}: TransactionModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isTransactionParceled, setIsTransactionParceled] = useState<boolean>();

  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>();

  const [transaction, setTransaction] = useState<Transaction | undefined>();

  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
    setValue,
  } = useForm<CreateTransactionProps>({
    resolver: yupResolver(createTransactionSchema),
  });

  useEffect(() => {
    const parceled = getValues("parceled");
    setIsTransactionParceled(parceled);

    if (parceled == false) {
      setValue("parcels", 0);
    }

    return () => {
      setIsTransactionParceled(undefined);
    };
  }, [watch("parceled")]);

  const handleModalState = () => {
    setIsOpen(!isOpen);
    setSelectedDate(undefined);
    setIsTransactionParceled(undefined);
    reset();
  };

  const handleGetTransaction = async () => {
    const transaction = await findTransactionRequest(transactionId);

    setTransaction(transaction);
  };

  useEffect(() => {
    if (transactionId) {
      handleGetTransaction();
    }
  }, []);

  useEffect(() => {
    reset(transaction);
  }, [transaction]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleModalState}>
      <DialogPrimitive.Trigger className="w-full">
        {children}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          forceMount
          className="fixed inset-0 z-20 bg-black/50"
        />
        <DialogPrimitive.Content
          forceMount
          className={clsx(
            "fixed z-50 max-w-2xl rounded-lg  md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white border-2 border-white"
          )}
        >
          <DialogPrimitive.Title className="">
            <div className="flex items-center justify-between px-4 py-4 bg-white rounded-t-lg border-b-2 border-blue-700">
              <DialogPrimitive.Close>
                <ArrowLeft size={30} className="text-blue-700 fill-current" />
              </DialogPrimitive.Close>
              <div className="flex items-center gap-4">
                <h3 className="text-2xl text-blue-700 font-medium">
                  {transactionType == "debt"
                    ? "Adicionar saída"
                    : "Adicionar entrada"}
                </h3>
                <div
                  className={clsx(
                    "flex justify-center items-center w-[2rem] h-[2rem] rounded-md",
                    {
                      "bg-red-500": transactionType == "debt",
                      "bg-green-500": transactionType !== "debt",
                    }
                  )}
                >
                  {transactionType == "debt" ? (
                    <ChartLineDown
                      size={25}
                      weight="bold"
                      className="fill-current text-white"
                    />
                  ) : (
                    <ChartLineUp
                      size={25}
                      weight="bold"
                      className="fill-current text-white"
                    />
                  )}
                </div>
              </div>
            </div>
          </DialogPrimitive.Title>
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={handleSubmit(async (data) => {
                if (data?.parcels > 1) {
                  const promises = [];
                  const valuePerParcel = data.value / data.parcels;
                  const newDate = new Date(data.date);
                  promises.push(
                    createTransactionRequest({
                      ...data,
                      value: valuePerParcel,
                      date: newDate,
                      company_id: companyId,
                      type: transactionType,
                    })
                  );
                  for (let i = 1; i < data.parcels; i++) {
                    const nextDate = new Date(newDate);
                    nextDate.setMonth(newDate.getMonth() + i);

                    promises.push(
                      createTransactionRequest({
                        ...data,
                        value: valuePerParcel,
                        date: nextDate,
                        description: `${data.description}(Parcela ${i + 1})`,
                        company_id: companyId,
                        type: transactionType,
                      })
                    );
                  }
                  await Promise.all(promises);
                } else {
                  await createTransactionRequest({
                    ...data,
                    date: new Date(data.date),
                    company_id: companyId,
                    type: transactionType,
                  });
                }

                queryClient.invalidateQueries({ queryKey: ["transactions"] });

                const company = await listCompanyByIdRequest(companyId);

                if (company) {
                  const updatedCompany = await updateCompanyRequest(
                    company.id,
                    {
                      balance:
                        transactionType == "debt"
                          ? company.balance! - data.value
                          : company.balance! + data.value,
                    }
                  );
                }

                reset();
                setIsTransactionParceled(undefined);
                setSelectedDate(undefined);
                setIsOpen(!isOpen);
              })}
              className="flex flex-col gap-4 w-full h-[60%] p-4 justify-evenly items-center"
            >
              <div className="w-full flex flex-col items-center gap-2">
                <div className="flex w-full gap-2">
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full">
                      <Input
                        className="h-[38px]"
                        register={register}
                        inputName="description"
                        inputLabel="Descrição"
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        className="h-[38px]"
                        register={register}
                        inputName="value"
                        inputLabel="Valor"
                        type="number"
                        // onChange={event => {
                        //   const formatter = new Intl.NumberFormat('en-US');
                        //   const formatedValue = formatter.format(
                        //     parseInt(event.target.value)
                        //   );
                        //   event.target.value = `${formatedValue},00`;
                        // }}
                      />
                    </div>
                    <div className="w-full">
                      <DateInput
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        label="Data"
                        name="date"
                        control={control}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex flex-col">
                      <label htmlFor="">É parcelado?</label>
                      <SelectComponent
                        name="parceled"
                        id="parceled"
                        control={control}
                        options={isParceledOptions}
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Pagamento realizado por</label>
                      <SelectComponent
                        name="payment_type"
                        id="payment_type"
                        control={control}
                        options={paymentOptions}
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label htmlFor="">Tipo</label>
                      <SelectComponent
                        name="finance_type"
                        id="finance_type"
                        control={control}
                        options={typesOptions}
                      />
                    </div>
                  </div>
                </div>
                {isTransactionParceled && (
                  <div className="w-[50%]">
                    <Input
                      inputDivClassName="w-full"
                      register={register}
                      inputName="parcels"
                      inputLabel="Parcelas"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isValid}
                className={clsx(
                  "text-white font-medium w-[30%] h-[38px] rounded-md",
                  {
                    "bg-red-500": transactionType == "debt",
                    "bg-green-500": transactionType == "income",
                    "bg-gray-400 opacity-50": isValid == false,
                    "hover:opacity-80": isValid == true,
                  }
                )}
              >
                Adicionar
              </Button>
            </form>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
