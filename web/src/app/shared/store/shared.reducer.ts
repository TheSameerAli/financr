import { User } from './../../authentication/_models/user';
import { refreshFinancialHealthRequest, refreshFinancialHealthDone, setFinancialHealthLoading, refreshUserPreferencesDone } from './shared.actions';
import { initialState, FinancialHealthState } from './../shared.state';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

const _sharedReducer = createReducer(
  initialState,
  on(setFinancialHealthLoading, (state, action) => {
    return {
      ...state,
      financialHealthState: {
        isLoading: action.status,
        financialHealth: state.financialHealthState.financialHealth,
      },

    };
  },
  ),
  on(refreshFinancialHealthDone, (state, health) => {
    return {
      ...state,
      financialHealthState: {
        isLoading: state.financialHealthState.isLoading,
        financialHealth: health
      },

    };
  }),
  on(refreshUserPreferencesDone, (state, userPreferences) => {
    return {
      ...state,
      userPreferences: userPreferences
    }
  })
)

export function sharedReducer(state, action) {
  return _sharedReducer(state, action);
}
