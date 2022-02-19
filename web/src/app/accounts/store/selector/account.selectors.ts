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


export const currentlyViewingAccountLoadingSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    return state[0].currentlyViewingAccount.isAccountLoading;
  }
)

export const spendingChartSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    return state[0].currentlyViewingAccount.spendingChart;
  }
)

export const currentlyViewingAccountTransactionsSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    let transactions = state[0].currentlyViewingAccount.transactions;
    //.format('MM/DD/YYYY')
    let sortedTransactions = arrayReverseObj(Object.assign([], _.groupBy(transactions, (tr) => moment(tr.transactionDate))));
    let orderedTransactions = sortedTransactions.sort((a, b) => b.date - a.date).map(data => {
      data['date'] = moment(data['date']).format('MM/DD/YYYY');
      return data;
    });
    return orderedTransactions;
  }
)

export const currentlyViewingAccountSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    return state[0].currentlyViewingAccount.account;
  }
)

export const currentlyViewingAccountPreferencesSelector = createSelector(
  selectAccountsState,
  (state: fromAccount.AccountState) => {
    return state[0].currentlyViewingAccount.account?.preferences;
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
