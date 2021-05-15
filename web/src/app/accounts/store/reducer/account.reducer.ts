import { Transaction } from './../../_models/transaction';
import { Account } from './../../_models/account';
import { createReducer, on } from '@ngrx/store';
import * as AccountActions from '../action/account.actions';

export const ACCOUNT_STATE_NAME = 'account';

export interface AccountState {
  accounts: Account[];
  isLoading: boolean;
  currentlyViewingAccount: {
    account: Account;
    transactions: Transaction[];
  }
}

export const initialState: AccountState = {
  accounts: [],
  isLoading: false,
  currentlyViewingAccount: {
    account: undefined,
    transactions: []
  }
};


export const accountReducer = createReducer(
  initialState,
    on(AccountActions.loadAccountsSuccess, (_, action) => ({..._, accounts: action.accounts})),
    on(AccountActions.accountSetIsLoading, (_, action) => ({..._, isLoading: action.status})),
    on(AccountActions.loadCurrentlyViewingAccountSuccess, (_, action: {accountData: Account}) => {
      return {..._, currentlyViewingAccount: {account: action.accountData, transactions: _.currentlyViewingAccount.transactions}}
    }),
    on(AccountActions.loadCurrentlyViewingAccountTransactionsSuccess, (_, action: {transactions: Transaction[]}) => {
      return {..._, currentlyViewingAccount: {account: _.currentlyViewingAccount.account, transactions: action.transactions}}
    })
);

