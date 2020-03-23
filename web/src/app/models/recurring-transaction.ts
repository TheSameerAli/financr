import { AccountCategory } from './accountCategory';
import { Account } from './account';
export interface RecurringTransaction {
    id: string;
    startDate: Date;
    occurrence: number;
    description: string;
    income: number;
    accountCategoryId: string;
    accountCategory?: AccountCategory;
    accountId: string;
    account?: Account;
    nextDate?: Date;
}
