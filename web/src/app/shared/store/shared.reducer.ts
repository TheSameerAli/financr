import { refreshFinancialHealthRequest, refreshFinancialHealthDone, setFinancialHealthLoading } from './shared.actions';
import { initialState, FinancialHealthState } from './../shared.state';
import { createReducer, on } from '@ngrx/store';

const _sharedReducer = createReducer(
  initialState,
  on(setFinancialHealthLoading, (state, action) => {
    return {
      financialHealthState: {
        isLoading: action.status,
        financialHealth: state.financialHealthState.financialHealth
      }
    };
  },
  ),
  on(refreshFinancialHealthDone, (state, health) => {
    return {
      financialHealthState: {
        isLoading: state.financialHealthState.isLoading,
        financialHealth: health
      }
    };
  })
)

export function sharedReducer(state, action) {
  return _sharedReducer(state, action);
}
