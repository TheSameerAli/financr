import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '../reducer/account.reducer';


export const selectAccountsState = createFeatureSelector<fromAccount.AccountState>(
  fromAccount.accountFeatureKey,
);

export const selectAccount = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => state.accounts
)

// export const createAccountSuccess = createSelector(
//   selectAccountsState,
//   (state: fromAccount.AccountState) => state.accounts
// )
