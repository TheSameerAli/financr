import { SpendingChart } from './../../_models/spending-chart';
import { Transaction } from './../../_models/transaction';
import { Account } from './../../_models/account';
import { Router } from '@angular/router';
import { refreshFinancialHealthRequest } from './../../../shared/store/shared.actions';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { loadAccountsRequest, loadAccountsSuccess, createAccountRequest, createAccountSuccess, accountSetIsLoading, loadCurrentlyViewingAccountRequest, loadCurrentlyViewingAccountSuccess, loadCurrentlyViewingAccountTransactionsRequest, loadCurrentlyViewingAccountTransactionsSuccess, currentlyViewingAccountSetLoading, loadSpendingChartRequest, loadSpendingChartSuccess } from './../action/account.actions';
import { AccountService } from './../../_services/accounts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from 'src/app/app.state';

@Injectable()
export class AccountEffects {

    constructor(
      private accountService: AccountService,
      private actions$: Actions,
      private store: Store<AppState>,
      private router: Router
      ) {}

    loadAccounts$ = createEffect(() => this.actions$.pipe(
      ofType(loadAccountsRequest),
      switchMap(() => {
        this.store.dispatch(accountSetIsLoading({status: true}));
        return this.accountService.getAccounts().pipe(
          map((accounts) => {
            this.store.dispatch(accountSetIsLoading({status: false}));
            return loadAccountsSuccess({accounts});
          })
        )
      })
    ));

    createAccount$ = createEffect(() => this.actions$.pipe(
      ofType(createAccountRequest),
      switchMap((action) => {
        this.store.dispatch(accountSetIsLoading({status: true}));
        return this.accountService.createAccount(action.account.type, action.account.name, action.account.balance).pipe(
          map(() => {
            this.store.dispatch(refreshFinancialHealthRequest());
            this.store.dispatch(accountSetIsLoading({status: false}));
            this.router.navigate(['/accounts']);
            return createAccountSuccess();
          })
        )
      })
    ));

    loadCurrentlyViewingAccount$ = createEffect(() => this.actions$.pipe(
      ofType(loadCurrentlyViewingAccountRequest),
      switchMap((action) => {
        this.store.dispatch(currentlyViewingAccountSetLoading({status: true}));
        return this.accountService.getAccount(action.accountId).pipe(
          map((account: Account) => {
            this.store.dispatch(currentlyViewingAccountSetLoading({status: false}));
            return loadCurrentlyViewingAccountSuccess({accountData: account});
          })
        )
      })
    ));


    loadCurrentlyViewingAccountTransactions$ = createEffect(() => this.actions$.pipe(
      ofType(loadCurrentlyViewingAccountTransactionsRequest),
      switchMap((action) => {
        this.store.dispatch(accountSetIsLoading({status: true}));
        return this.accountService.getTransactions(action.accountId).pipe(
          map((transactions: Transaction[]) => {
            this.store.dispatch(accountSetIsLoading({status: false}));
            return loadCurrentlyViewingAccountTransactionsSuccess({transactions: transactions});
          })
        )
      })
    ));

    loadSpendingChart$ = createEffect(() => this.actions$.pipe(
      ofType(loadSpendingChartRequest),
      switchMap((action) => {
        this.store.dispatch(accountSetIsLoading({status: true}));
        return this.accountService.getSpendingChart(action.accountId).pipe(
          map((spendingChart: SpendingChart) => {
            if (spendingChart.data.length === 0) {
              spendingChart = {
                data: [{name: 'none', value: 0.0000000000001}]
              }
            }
            this.store.dispatch(accountSetIsLoading({status: false}));
            return loadSpendingChartSuccess({spendingChart: spendingChart});
          })
        )
      })
    ));

}
