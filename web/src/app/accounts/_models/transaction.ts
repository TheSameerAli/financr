export class Transaction {
  id: string;
  amount: number;
  description: string;
  accountId: string;
  transactionDate: Date;
  accountCategoryId: string;
  accountCategory: AccountCategory;
}

export interface AccountCategory {
  id: string;
  name: string;
  type: number;
}
