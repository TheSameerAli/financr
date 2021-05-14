import { Transaction } from './../_models/transaction';
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

  createAccount(type: number, name: string, balance: number): Observable<Account> {
    return this.http.post<Account>(`${ACCOUNT_API}/create`, {name: name, type: type, initialAmount: balance}, httpOptions);
  }

  getTransactions(accountId: string) {
    return this.http.get<Transaction[]>(`${ACCOUNT_API}/${accountId}/transactions`);
  }

  getTransaction(accountId: string, transactionId: string) {
    return this.http.get<Transaction>(`${ACCOUNT_API}/${accountId}/transactions/${transactionId}`)
  }
}
