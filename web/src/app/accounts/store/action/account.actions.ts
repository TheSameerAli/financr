import { SpendingChart } from './../../_models/spending-chart';
import { Account } from './../../_models/account';
import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../_models/transaction';

const LOAD_ACCOUNT_REQUEST_ACTION = '[Account] load accounts request';
const LOAD_ACCOUNT_SUCCESS_ACTION = '[Account] load accounts success';


const CREATE_ACCOUNT_REQUEST_ACTION = '[Account] create account request';
const CREATE_ACCOUNT_SUCCESS_ACTION = '[Account] create account success';

const LOAD_CURRENTLY_VIEWING_ACCOUNT_REQUEST = '[Account] load currently viewing account request';
const LOAD_CURRENTLY_VIEWING_ACCOUNT_SUCCESS = '[Account] load currently viewing account success';

const LOAD_CURRENTLY_VIEWING_ACCOUNT_TRANSACTIONS_REQUEST = '[Account] load currently viewing account transaction request';
const LOAD_CURRENTLY_VIEWING_ACCOUNT_TRANSACTIONS_SUCCESS = '[Account] load currently viewing account transaction success';

const LOAD_SPENDING_CHART_REQUEST = '[Account] load spending chart request';
const LOAD_SPENDING_CHART_SUCCESS = '[Account] load spending chart success';


const ACCOUNT_SET_IS_LOADING = '[Account] account set is loading';
const SET_CURRENTLY_VIEWING_ACCOUNT_LOADING = '[Account] currently viewing account set is loading';

export const loadAccountsRequest = createAction(LOAD_ACCOUNT_REQUEST_ACTION);
export const loadAccountsSuccess = createAction(LOAD_ACCOUNT_SUCCESS_ACTION, props<{accounts: Account[]}>());


export const createAccountRequest = createAction(CREATE_ACCOUNT_REQUEST_ACTION, props<{account: Account}>());
export const createAccountSuccess = createAction(CREATE_ACCOUNT_SUCCESS_ACTION);

export const loadCurrentlyViewingAccountRequest = createAction(LOAD_CURRENTLY_VIEWING_ACCOUNT_REQUEST, props<{accountId: string}>());
export const loadCurrentlyViewingAccountSuccess = createAction(LOAD_CURRENTLY_VIEWING_ACCOUNT_SUCCESS, props<{accountData: Account}>());


export const loadCurrentlyViewingAccountTransactionsRequest = createAction(LOAD_CURRENTLY_VIEWING_ACCOUNT_TRANSACTIONS_REQUEST, props<{accountId: string}>());
export const loadCurrentlyViewingAccountTransactionsSuccess = createAction(LOAD_CURRENTLY_VIEWING_ACCOUNT_TRANSACTIONS_SUCCESS, props<{transactions: Transaction[]}>());

export const loadSpendingChartRequest = createAction(LOAD_SPENDING_CHART_REQUEST, props<{accountId: string}>());
export const loadSpendingChartSuccess = createAction(LOAD_SPENDING_CHART_SUCCESS, props<{spendingChart: SpendingChart}>());

export const accountSetIsLoading = createAction(ACCOUNT_SET_IS_LOADING, props<{status: boolean}>());
export const currentlyViewingAccountSetLoading = createAction(SET_CURRENTLY_VIEWING_ACCOUNT_LOADING, props<{status: boolean}>());

