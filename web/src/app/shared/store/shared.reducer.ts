import { setIsLoading } from './shared.actions';
import { initialState } from './../shared.state';
import { createReducer, on } from '@ngrx/store';
const _sharedReducer = createReducer(
  initialState,
  on(setIsLoading, (state, action) => {
  return {
    state,
    isLoading: action.status
  }
}))

export function sharedReducer(state, action) {
  return _sharedReducer(state, action);
}
