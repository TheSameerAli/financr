import { UserPreferences } from './../../settings/_models/user-preferences';
import { FinancialHealth } from '../_models/financial-health';
import { createAction, props } from '@ngrx/store';
export const SET_LOADING_FINNACIALHEALTH_ACTION = '[SHARED] loading financial health';
export const REFRESH_FINANCIAL_HEALTH_REQUEST = '[SHARED] refresh financial health request'
export const REFRESH_FINANCIAL_HEALTH_DONE = '[SHARED] refresh financial health done'
export const REFRESH_USER_PREFERENCES_REQUEST = '[SHARED] refresh user preferences request'
export const REFRESH_USER_PREFERENCES_DONE = '[SHARED] refresh user preferences done'


export const setFinancialHealthLoading = createAction(SET_LOADING_FINNACIALHEALTH_ACTION, props<{status: boolean}>());
export const refreshFinancialHealthRequest = createAction(REFRESH_FINANCIAL_HEALTH_REQUEST);
export const refreshFinancialHealthDone = createAction(REFRESH_FINANCIAL_HEALTH_DONE, props<FinancialHealth>());
export const refreshUserPreferencesRequest = createAction(REFRESH_USER_PREFERENCES_REQUEST);
export const refreshUserPreferencesDone = createAction(REFRESH_USER_PREFERENCES_DONE, props<UserPreferences>());
