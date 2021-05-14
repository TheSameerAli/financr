import { Transaction } from './../../_models/transaction';
import { Account } from './../../_models/account';
import { createReducer, on } from '@ngrx/store';
import * as AccountActions from '../action/account.actions';

export const ACCOUNT_STATE_NAME = 'account';

export interface AccountState {
  accounts: Account[];
  isLoading: boolean;
}

export const initialState: AccountState = {
  accounts: [],
  isLoading: false,
};


export const accountReducer = createReducer(
  initialState,
    on(AccountActions.loadAccountsSuccess, (_, action) => ({..._, accounts: action.accounts})),
    on(AccountActions.accountSetIsLoading, (_, action) => ({..._, isLoading: action.status})),
    // on(AccountActions.loadAccountTransactionsSuccess, (_, action: {transactions: Transaction[]}) => {
    //   var accountsClone: Account[] = Object.assign({}, _.accounts);
    //   accountsClone[0].balance = 100;
    //   console.log(accountsClone);
    //   let accountIndex = accountsClone.findIndex(a => a.id === action.transactions[0]?.accountId);
    //   // accountsClone[accountIndex].transactions.splice(0, accountsClone[accountIndex].transactions.length);
    //   accountsClone[accountIndex].transactions.push(...action.transactions);
    //   return {..._, accounts: accountsClone}
    // })
);

