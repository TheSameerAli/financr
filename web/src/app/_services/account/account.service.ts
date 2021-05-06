import { Account } from './../../models/data/account';
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
}
