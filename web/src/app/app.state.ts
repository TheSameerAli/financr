import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/store/shared.selector';
import { Account } from './accounts/_models/account';
export interface AppState {
  [SHARED_STATE_NAME]: SharedState
}
