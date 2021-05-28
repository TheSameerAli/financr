import { Transaction } from './transaction';
export class Account {
  id: string;
  name: string;
  type: number;
  userId: string;
  balance: number;
  availableBalance: number;
  totalIncome: number;
  totalOutgoings: number;
  transactions: Transaction[];
}
