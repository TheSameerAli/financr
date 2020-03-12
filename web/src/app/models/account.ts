export interface Account {
    name: string;
    id: string;
    type: AccountType;
    availableBalance: number;
    totalIncome: number;
    totalOutgoings: number;
}

export enum AccountType {
    Current = 0,
    Business = 1,
    Savings = 2,
    CreditCard = 3
}

export interface CreateAccountRequest {
    name: string;
    type: AccountType;
    initialAmount: number;
}
