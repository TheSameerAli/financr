export interface AccountCategory {
    id: string;
    name: string;
    type: CategoryType;
    accountId: string;
}

export enum CategoryType {
    Income = 0,
    Expense = 1
}
