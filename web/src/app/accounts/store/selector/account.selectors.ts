import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '../reducer/account.reducer';


export const selectAccountsState = createFeatureSelector<fromAccount.AccountState>(
  fromAccount.ACCOUNT_STATE_NAME,
);

export const selectAccounts = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    return state[0].accounts;
  }
)

export const accountsIsLoadingSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    return state[0].isLoading
  }
)

export const selectTransactions = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
  }
)