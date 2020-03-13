import { AccountCategory } from './accountCategory';
export interface Transaction {
    id: string;
    description: string;
    income: number;
    transactionDate: Date;
    accountCategoryId: string;
    accountCategory?: AccountCategory;
}
