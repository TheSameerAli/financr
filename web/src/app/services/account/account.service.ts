import { CategoryType } from './../../models/accountCategory';
import { CreateAccountRequest, Account } from './../../models/account';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  createAccount(account: CreateAccountRequest) {
    const uri = `/account/create`;
    return this.http.post(uri, account);
  }

  getAccounts() {
    const uri = `/account/list`;
    return this.http.get(uri);
  }

  getAccount(accountId: string) {
    const uri = `/account/${accountId}`;
    return this.http.get(uri);
  }

  createCategory(accountId: string, name: string, type: CategoryType) {
    const data = {
      name,
      type
    };
    const uri = `/account/${accountId}/category/create`;
    return this.http.post(uri, data);
  }

  getCategories(accountId: string) {
    const uri = `/account/${accountId}/categories`;
    return this.http.get(uri);
  }

  deleteCategory(accountId: string, accountCategoryId: string) {
    const uri = `/account/${accountId}/category/${accountCategoryId}/delete`;
    return this.http.delete(uri);
  }

  createTransation(description: string, transactionDate: Date, income: number, accountCategoryId: string, accountId: string) {
    const data = {
      description,
      transactionDate,
      accountCategoryId,
      income
    };
    const uri = `/account/${accountId}/transaction/create`;
    return this.http.post(uri, data);
  }

  getTransactions(accountId: string) {
    const uri = `/account/${accountId}/transactions`;
    return this.http.get(uri);
  }

  getTransactionsByMonth(accountId: string, date: Date) {
    const uri = `/account/${accountId}/transactions?dateMonth=${date.toJSON()}`;
    return this.http.get(uri);
  }
}
