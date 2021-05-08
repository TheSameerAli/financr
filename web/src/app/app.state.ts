import { RouterStateUrl } from './store/reducers/index';
import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/store/shared.selector';
import { Account } from './accounts/_models/account';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState,
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>

}
