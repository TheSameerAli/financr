import { Account } from './../../_models/account';
import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../_models/transaction';

const LOAD_ACCOUNT_REQUEST_ACTION = '[Account] load accounts request';
const LOAD_ACCOUNT_SUCCESS_ACTION = '[Account] load accounts success';


const CREATE_ACCOUNT_REQUEST_ACTION = '[Account] create account request';
const CREATE_ACCOUNT_SUCCESS_ACTION = '[Account] create account success';

const LOAD_ACCOUNT_TRANSACTIONS_REQUEST_ACTION = '[Account] load account transactions request';
const LOAD_ACCOUNT_TRANSACTIONS_SUCCESS_ACTION = '[Account] load account transactions success';


const ACCOUNT_SET_IS_LOADING = '[Account] account set is loading';


export const loadAccountsRequest = createAction(LOAD_ACCOUNT_REQUEST_ACTION);
export const loadAccountsSuccess = createAction(LOAD_ACCOUNT_SUCCESS_ACTION, props<{accounts: Account[]}>());


export const createAccountRequest = createAction(CREATE_ACCOUNT_REQUEST_ACTION, props<{account: Account}>());
export const createAccountSuccess = createAction(CREATE_ACCOUNT_SUCCESS_ACTION);

export const loadAccountTransactionsRequest = createAction(LOAD_ACCOUNT_TRANSACTIONS_REQUEST_ACTION, props<{accountId: string}>());
export const loadAccountTransactionsSuccess = createAction(LOAD_ACCOUNT_TRANSACTIONS_SUCCESS_ACTION, props<{transactions: Transaction[]}>());


export const accountSetIsLoading = createAction(ACCOUNT_SET_IS_LOADING, props<{status: boolean}>());
