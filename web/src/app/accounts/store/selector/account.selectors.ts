import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '../reducer/account.reducer';
import _, { map} from 'underscore';
import * as moment from 'moment';

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

export const currentlyViewingAccountTransactionsSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    let transactions = state[0].currentlyViewingAccount.transactions;
    let sortedTransactions = arrayReverseObj(Object.assign([], _.groupBy(transactions, (tr) => moment(tr.transactionDate).format('MM/DD/YYYY'))));
    return sortedTransactions;
  }
)

export const currentlyViewingAccountSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    return state[0].currentlyViewingAccount.account;
  }
)

const arrayReverseObj = (obj) => {
  let newArray = []

  Object.keys(obj)
    .sort()
    .reverse()
    .forEach(key => {
      newArray.push( {
      'date':key,
      'transactions':obj[key]
      })
    })
  return newArray
}
