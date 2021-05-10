import { Router } from '@angular/router';
import { refreshFinancialHealthRequest } from './../../../shared/store/shared.actions';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { loadAccountsRequest, loadAccountsSuccess, createAccountRequest, createAccountSuccess, accountSetIsLoading } from './../action/account.actions';
import { AccountService } from './../../_services/accounts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from 'src/app/app.state';
import { routerNavigationAction, ROUTER_REQUEST } from '@ngrx/router-store';


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

}
