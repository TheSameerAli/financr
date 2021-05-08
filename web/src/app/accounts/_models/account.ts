import { Transaction } from './transaction';
export class Account {
  name: string;
  type: number;
  userId: string;
  balance: number;
  transactions: Transaction[];
}
