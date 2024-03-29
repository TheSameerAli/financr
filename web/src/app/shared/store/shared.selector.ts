import { SharedState } from './../shared.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state) => {
  return state[0].financialHealthState.isLoading;
})

export const getNetworth = createSelector(getSharedState, (state) => {
  return state[0].financialHealthState.financialHealth.totalNetWorth;
});


export const getUserPreferences = createSelector(getSharedState, (state) => {
  return state[0].userPreferences;
})
