import { Account } from './../../_models/account';
import { createAction, props } from '@ngrx/store';

export const loadAccountsRequest = createAction(
  '[Account] Load Accounts Request',
);

export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Done', (accounts: Account[]) => ({accounts})
);

export const createAccountRequest = createAction(
  '[Account] Create Account Request',
  (account: Account) => ({account})
);

export const createAccountSuccess = createAction('[Account] Create Account Success');
