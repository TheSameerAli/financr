import { setIsLoading } from './../../../shared/store/shared.actions';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { loadAccountsRequest, loadAccountsSuccess, createAccountRequest, createAccountSuccess } from './../action/account.actions';
import { AccountService } from './../../_services/accounts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from 'src/app/app.state';


@Injectable()
export class AccountEffects {

    constructor(
      private accountService: AccountService,
      private actions$: Actions,
      private store: Store<AppState>
      ) {}

    loadAccounts$ = createEffect(() => this.actions$.pipe(
      ofType(loadAccountsRequest),
      switchMap(() => {
        this.store.dispatch(setIsLoading({status: true}));
        return this.accountService.getAccounts().pipe(
          map((accounts) => {
            this.store.dispatch(setIsLoading({status: false}));
            return loadAccountsSuccess(accounts);
          })
        )
      })
    ));

    createAccount$ = createEffect(() => this.actions$.pipe(
      ofType(createAccountRequest),
      switchMap((action) => {
        this.store.dispatch(setIsLoading({status: true}));
        return this.accountService.createAccount(action.account.type, action.account.name, action.account.balance).pipe(
          map(() => {
            this.store.dispatch(setIsLoading({status: false}));
            return createAccountSuccess();
          })
        )
      })
    ));

}
