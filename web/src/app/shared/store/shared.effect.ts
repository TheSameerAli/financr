import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { setFinancialHealthLoading, refreshFinancialHealthDone, refreshFinancialHealthRequest } from './shared.actions';
import { switchMap, map } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { OverviewService } from './../_services/overview.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedEffects {
  constructor(
    private overviewService: OverviewService,
    private store: Store<AppState>,
    private actions$: Actions) {
  }

  refreshNetworth$ = createEffect(() => this.actions$.pipe(
    ofType(refreshFinancialHealthRequest),
    switchMap(() => {
      this.store.dispatch(setFinancialHealthLoading({status: true}));
      return this.overviewService.getFinancialHealth().pipe(
        map((financialHealth) => {
          this.store.dispatch(setFinancialHealthLoading({status: false}));
          return refreshFinancialHealthDone(financialHealth);
        })
      )
    })
  ));


}
