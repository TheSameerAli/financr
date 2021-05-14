import { Transaction } from './transaction';
export class Account {
  id: string;
  name: string;
  type: number;
  userId: string;
  balance: number;
  transactions: Transaction[];
}
