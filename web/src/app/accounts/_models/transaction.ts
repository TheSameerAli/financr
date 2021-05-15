export class Transaction {
  id: string;
  income: number;
  description: string;
  accountId: string;
  transactionDate: Date;
  accountCategoryId: string;
  accountCategory: AccountCategory;
}

export interface AccountCategory {
  id: string;
  name: string;
}
