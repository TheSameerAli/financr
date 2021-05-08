import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[SHARED] loading';

export const setIsLoading = createAction(SET_LOADING_ACTION, props<{status: boolean}>());
