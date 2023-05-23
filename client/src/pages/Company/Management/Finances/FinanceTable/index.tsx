import { useEffect, useState } from "react";
import {
  getCompanyTransactionsRequest,
  transformTransactionsToTxtRequest,
  deleteTransactionRequest,
  findTransactionRequest,
} from "../../../../../services/Transactions";
import { FinanceTableProps, Transaction } from "./interface";
import {
  NotePencil,
  Trash,
  ChartLineDown,
  ChartLineUp,
  FileArrowDown,
  MicrosoftExcelLogo,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import {
  formatDate,
  getFirstAndLastDaysFromDate,
} from "../../../../../util/transformDate";
import { handleDownloadExcel } from "../../../../../util/generateExcel";
import {
  Button,
  SelectComponent,
  TransactionModal,
  FilterSelect,
} from "../../../../../components";
import clsx from "clsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface SelectedDate {
  firstDay: string;
  lastDay: string;
}

export const FinanceTable = ({ companyId }: FinanceTableProps) => {
  const [queryParam, setQueryParam] = useState<string | undefined>("");

  const [areAllChecked, setAreAllChecked] = useState<boolean>(false);
  const [selectedTransactions, setSelectedTransactions] = useState<
    Transaction[]
  >([]);
  const [creditsTotal, setCreditsTotal] = useState<number>(0);
  const [debtsTotal, setDebstsTotal] = useState<number>(0);

  const queryClient = useQueryClient();

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions", queryParam],
    queryFn: () => getCompanyTransactionsRequest(companyId, queryParam),
  });

  const { mutate: deleteTransaction } = useMutation({
    mutationFn: deleteTransactionRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const calculateTransactions = () => {
    let debts: number[] = [];
    let credits: number[] = [];

    if (transactions?.length! > 0) {
      transactions
        ?.filter((transaction) => transaction.type == "income")
        .map((transaction) => credits.push(transaction.value));
      transactions
        ?.filter((transaction) => transaction.type !== "income")
        .map((transaction) => debts.push(transaction.value));

      const debtsSum = debts.reduce((partialSum, a) => partialSum + a, 0);
      const creditsSum = credits.reduce((partialSum, a) => partialSum + a, 0);

      setCreditsTotal(creditsSum);
      setDebstsTotal(debtsSum);
    }
  };

  useEffect(() => {
    calculateTransactions();
  }, [transactions]);

  const navigate = useNavigate();

  const handleSelectTransactions = (
    event: React.ChangeEvent<HTMLInputElement>,
    transaction: Transaction
  ) => {
    setSelectedTransactions([...selectedTransactions, transaction]);

    if (!event.target.checked) {
      setSelectedTransactions(
        selectedTransactions.filter(
          (selectedTransaction) => selectedTransaction != transaction
        )
      );
    }
  };

  const handleSelectAllTransactions = () => {
    setAreAllChecked(!areAllChecked);
    if (transactions) {
      setSelectedTransactions(transactions?.map((transaction) => transaction));
    }
    if (areAllChecked) {
      setSelectedTransactions([]);
    }
  };

  const handleDownloadTxtFile = async () => {
    const file = await transformTransactionsToTxtRequest(selectedTransactions);
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "text.txt");
    document.body.appendChild(link);
    link.click();
  };

  const handleUpdateTransaction = async (id: string | undefined) => {
    const transaction = await findTransactionRequest(id);

    console.log(transaction);
  };

  console.log(queryParam);

  return (
    <div className="overflow-x-auto w-full h-full p-4">
      <div className="w-full h-[30%] border-b-4 border-white bg-gray-100 flex flex-col items-center justify-evenly px-2">
        <div className="w-full h-[50%]  flex justify-between flex-col">
          <div className="w-full h-[50%]  flex p-6 gap-6">
            <Button
              disabled={selectedTransactions.length == 0}
              onClick={handleDownloadTxtFile}
              className={clsx(
                "w-[15%] h-[40%]  p-4 flex items-center justify-between border border-black bg-white rounded-lg opacity-50",
                {
                  "transition ease-in-out delay-50 hover:-translate-y-0.5 hover:scale-110 duration-300 active:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400 opacity-90":
                    selectedTransactions.length > 0,
                }
              )}
            >
              <p className="font-medium text-md">Baixar txt</p>
              <FileArrowDown size={25} />
            </Button>
            <Button
              disabled={selectedTransactions.length == 0}
              onClick={() => {
                const {
                  description,
                  value,
                  date,
                  type,
                  finance_type,
                  payment_type,
                } = selectedTransactions[0];
                const newTransactions = selectedTransactions.filter(
                  (transaction) => transaction != selectedTransactions[0]
                );

                let debtCode;
                let creditCode;

                type == "debt"
                  ? (debtCode = finance_type.split("-")[0])
                  : (debtCode = payment_type.split("-")[0]);
                type == "debt"
                  ? (creditCode = payment_type.split("-")[0])
                  : (creditCode = finance_type.split("-")[0]);

                handleDownloadExcel({
                  fileName: "test",
                  sheet: "test",
                  tableHeader: [
                    "COMPROVANTE",
                    `${formatDate(date)}`,
                    type == "debt"
                      ? `-${value.toFixed(2).replace(".", ",")}`
                      : `${value.toFixed(2).replace(".", ",")}`,
                    debtCode,
                    creditCode,
                    `VALOR REF. ${description.toLocaleUpperCase()}, CONF RELATÓRIO.`,
                  ],
                  tableBody: newTransactions.map(
                    ({
                      description,
                      value,
                      date,
                      type,
                      payment_type,
                      finance_type,
                    }) => {
                      let debtCode;
                      let creditCode;

                      type == "debt"
                        ? (debtCode = finance_type.split("-")[0])
                        : (debtCode = payment_type.split("-")[0]);
                      type == "debt"
                        ? (creditCode = payment_type.split("-")[0])
                        : (creditCode = finance_type.split("-")[0]);
                      return [
                        "COMPROVANTE",
                        `${formatDate(date)}`,
                        type == "debt"
                          ? `-${value.toFixed(2).replace(".", ",")}`
                          : `${value.toFixed(2).replace(".", ",")}`,
                        debtCode,
                        creditCode,
                        `VALOR REF. ${description.toLocaleUpperCase()} , CONF RELATÓRIO.`,
                      ];
                    }
                  ),
                });
              }}
              className={clsx(
                "w-[15%] h-[40%]  p-4 flex items-center justify-between border border-green-700 bg-white rounded-lg opacity-50",
                {
                  "transition ease-in-out delay-50 hover:-translate-y-0.5 hover:scale-110 duration-300 active:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400 opacity-90":
                    selectedTransactions.length > 0,
                }
              )}
            >
              <p className="font-medium text-md text-green-700">Baixar Excel</p>
              <MicrosoftExcelLogo
                size={25}
                className="text-green-700 fill-current"
              />
            </Button>
            <div className="flex items-center bg-green-500 w-[20%] h-[40%] p-4 hover:bg-green-600 cursor-pointer rounded-lg">
              <TransactionModal companyId={companyId} transactionType="income">
                <div className="flex items-center justify-between w-full">
                  <p className="text-md font-medium text-white">
                    Adicionar entrada
                  </p>
                  <ChartLineUp size={25} className="text-white fill-current" />
                </div>
              </TransactionModal>
            </div>
            <div className="flex items-center bg-red-500 w-[20%] h-[40%] p-4 hover:bg-red-600 cursor-pointer rounded-lg">
              <TransactionModal companyId={companyId} transactionType="debt">
                <div className="flex items-center justify-between w-full">
                  <p className="text-md font-medium text-white">
                    Adicionar saída
                  </p>
                  <ChartLineDown
                    size={25}
                    className="text-white fill-current"
                  />
                </div>
              </TransactionModal>
            </div>
          </div>
          <div className="w-full flex p-6 gap-6">
            <div className="w-[15%] h-[40%] flex flex-col">
              <p className="font-medium">Mês/Ano</p>
              <FilterSelect
                optionsType={["start_date", "end_date"]}
                setSelectedFilter={setQueryParam}
                selectedFilter={queryParam}
              />
            </div>
            <div className="w-[15%] h-[40%] flex flex-col">
              <p className="font-medium">Tipo de pagamento</p>
              <FilterSelect
                optionsType={["payment_type"]}
                setSelectedFilter={setQueryParam}
                selectedFilter={queryParam}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[50%] flex items-center justify-evenly">
          <div className="w-[30%] h-[40%] flex flex-col">
            <p className="font-medium">TOTAL ENTRADAS</p>
            <div className="bg-white w-full h-full flex items-center justify-center">
              <p className="font-medium text-green-500">{`R$ ${creditsTotal
                .toFixed(2)
                .replace(".", ",")}`}</p>
            </div>
          </div>
          <div className="w-[30%] h-[40%] flex flex-col">
            <p className="font-medium">TOTAL SAÍDAS</p>
            <div className="bg-white w-full h-full flex items-center justify-center">
              <p className="font-medium text-red-500">{`R$ -${debtsTotal
                .toFixed(2)
                .replace(".", ",")}`}</p>
            </div>
          </div>
          <div className="w-[30%] h-[40%] flex flex-col">
            <p className="font-medium">SALDO</p>
            <div className="bg-white w-full h-full flex items-center justify-center">
              <p className="font-medium text-blue-500">{`R$${(
                creditsTotal - debtsTotal
              )
                .toFixed(2)
                .replace(".", ",")}`}</p>
            </div>
          </div>
        </div>
      </div>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">
              <input type="checkbox" onChange={handleSelectAllTransactions} />
            </th>
            <th className="px-4 py-2 text-left w-[15vw]">Descrição</th>
            <th className="px-4 py-2 text-left w-[10vw]">Valor</th>
            <th className="px-4 py-2 text-left w-[10vw]">Pagamento</th>
            <th className="px-4 py-2 text-left w-[15vw]">Tipo</th>
            <th className="px-4 py-2 text-left w-[5vw]">Data</th>
            <th className="px-4 py-2 text-left w-[12vw]">Forma de pagamento</th>
            <th className="px-4 py-2 text-left w-[5vw]">Parcelas</th>
            <th className="px-4 py-2 text-left w-[5vw]">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="px-4 py-2">
                <input
                  onChange={(event) =>
                    handleSelectTransactions(event, transaction)
                  }
                  checked={selectedTransactions.includes(transaction)}
                  type="checkbox"
                />
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-[15vw] truncate">
                  {transaction.description}
                </div>
              </td>
              <td className="px-4 py-2">
                {transaction.type == "debt" ? (
                  <div className="flex gap-2 text-sm">
                    <div className="bg-red-500 w-fit h-fit text-sm">
                      <ChartLineDown
                        size={20}
                        className="text-white fill-current"
                      />
                    </div>
                    {`R$ -${transaction.value.toFixed(2).replace(".", ",")}`}
                  </div>
                ) : (
                  <div className="flex gap-2 text-sm">
                    <div className="bg-green-500 w-fit h-fit text-sm">
                      <ChartLineUp
                        size={20}
                        className="text-white fill-current"
                      />
                    </div>
                    {`R$ ${transaction.value.toFixed(2).replace(".", ",")}`}
                  </div>
                )}
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-[10vw] truncate">
                  {transaction.payment_type}
                </div>
              </td>
              <td className="px-4 py-2 text-sm">
                <div className="w-[15vw] truncate">
                  {transaction.finance_type}
                </div>
              </td>
              <td className="px-4 py-2 text-sm">
                {formatDate(transaction.date)}
              </td>
              <td className="px-4 py-2 text-sm">
                {transaction.parcels == 0 ? "À vista" : "Parcelado"}
              </td>
              <td className="px-4 py-2">
                {transaction.parcels == 0 ? "-" : `x${transaction.parcels}`}
              </td>
              <td className="px-4 py-2 flex gap-4">
                <div>
                  <TransactionModal
                    transactionType={transaction.type}
                    companyId={companyId}
                    transactionId={transaction.id}
                  >
                    <NotePencil
                      onClick={() => handleUpdateTransaction(transaction.id)}
                      size={20}
                      weight="bold"
                      className="text-gray-800 cursor-pointer fill-current hover:opacity-80"
                    />
                  </TransactionModal>
                </div>
                <Trash
                  onClick={() => deleteTransaction(transaction.id)}
                  size={20}
                  weight="bold"
                  className="text-red-500 cursor-pointer fill-current hover:opacity-80"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
