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
    on(AccountActions.accountSetIsLoading, (_, action) => ({..._, isLoading: action.status}))
);

