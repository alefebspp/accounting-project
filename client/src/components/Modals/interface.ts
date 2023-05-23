export interface TransactionModalProps {
  children: React.ReactNode;
  transactionType: string;
  companyId: string | undefined;
  transactionId?: string | undefined;
}
