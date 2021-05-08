import { AppState } from 'src/app/app.state';
import { SHARED_STATE_NAME } from './../../shared/store/shared.selector';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { sharedReducer } from 'src/app/shared/store/shared.reducer';

export const ROUTER_REDUCER_NAME = 'routerReducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export const reducers: ActionReducerMap<AppState> = {
  routerReducer: fromRouter.routerReducer,
  [SHARED_STATE_NAME]: sharedReducer
}

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');


export class CustomSerialzer implements fromRouter.RouterStateSerializer<RouterStateUrl> {

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params }  = state;
    return { url, queryParams, params };
  }

}
