import { Account } from './../../models/data/account';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACCOUNT_API = `${environment.api}/account`;

@Injectable({
  providedIn: 'root'
})


export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${ACCOUNT_API}/list`);
  }
}
