import { formatDate } from '../../../../../shared/utils/formatDate';
import fs from 'fs';

interface Transaction {
  value: number;
  description: string;
  date: string;
  company_id: string;
  parcels?: number;
  type: string;
}

class TransactionsToTxtUseCase {
  execute(transactions: Transaction[]) {
    try {
      let data = 'Descrição|Valor|Data|É parcelado?|Parcelas \n';

      transactions.forEach(transaction => {
        data =
          data +
          `${transaction.description}|${
            transaction.type == 'debt'
              ? `-${transaction.value}`
              : transaction.value
          }|${formatDate(transaction.date)}|${
            transaction.parcels ? 'SIM' : 'NÃO'
          }|${transaction.parcels == 0 ? '-' : transaction.parcels} \n`;
      });

      const file = fs.writeFileSync('text.txt', data);

      return file;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TransactionsToTxtUseCase;
