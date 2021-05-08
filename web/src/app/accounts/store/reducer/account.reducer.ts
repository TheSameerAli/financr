import { Account } from './../../_models/account';
import { createReducer, on } from '@ngrx/store';
import * as AccountActions from '../action/account.actions';

export const accountFeatureKey = 'account';

export interface AccountState {
  accounts: Account[];
}

export const initialState: AccountState = {
  accounts: []
};


export const accountReducer = createReducer(
  AccountActions.loadAccountsRequest(),
    on(AccountActions.createAccountRequest, (_, account) => ({})),
    on(AccountActions.createAccountSuccess, (_, action) => action.type),
    on(AccountActions.loadAccountsSuccess, (_, action) => action.accounts),

);

