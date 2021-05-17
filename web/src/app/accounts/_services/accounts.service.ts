import { SpendingChart } from './../_models/spending-chart';
import { AccountCategory, Transaction } from './../_models/transaction';
import { Account } from './../_models/account';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACCOUNT_API = `${environment.api}/account`;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})


export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${ACCOUNT_API}/list`);
  }

  getAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${ACCOUNT_API}/${accountId}`);
  }

  getAccountCategories(accountId: string): Observable<AccountCategory[]> {
    return this.http.get<AccountCategory[]>(`${ACCOUNT_API}/${accountId}/categories`);
  }

  createAccount(type: number, name: string, balance: number): Observable<Account> {
    return this.http.post<Account>(`${ACCOUNT_API}/create`, {name: name, type: type, initialAmount: balance}, httpOptions);
  }

  getTransactions(accountId: string) {
    return this.http.get<Transaction[]>(`${ACCOUNT_API}/${accountId}/transactions`);
  }

  getTransaction(accountId: string, transactionId: string) {
    return this.http.get<Transaction>(`${ACCOUNT_API}/${accountId}/transactions/${transactionId}`)
  }

  getSpendingChart(accountId: string) {
    return this.http.get<SpendingChart>(`${ACCOUNT_API}/${accountId}/spending-chart`);
  }

  createTransaction(accountId: string, amount: number, description: string, accountCategoryId: string, transactionDate: Date) {
    return this.http.post<Transaction>(`${ACCOUNT_API}/${accountId}/transaction/create`, {
      amount: amount,
      description: description,
      accountCategoryId: accountCategoryId,
      transactionDate: transactionDate.toUTCString()
    }, httpOptions);
  }

  editTransaction(accountId: string, transactionId: string, amount: number, description: string, accountCategoryId: string, transactionDate: Date) {
    return this.http.put<Transaction>(`${ACCOUNT_API}/${accountId}/transaction/${transactionId}/edit`, {
      amount: amount,
      description: description,
      accountCategoryId: accountCategoryId,
      transactionDate: transactionDate.toUTCString()
    }, httpOptions);
  }

  deleteTransaction(accountId: string, transactionId: string) {
    return this.http.delete<any>(`${ACCOUNT_API}/${accountId}/transaction/${transactionId}/delete`)
  }
}
