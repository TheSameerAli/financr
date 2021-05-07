import { Transaction } from './../../dashboard/_models/transaction';
export interface Account {
  name: string;
  type: number;
  userId: string;
  balance: number;
  transactions: Transaction[];
}
