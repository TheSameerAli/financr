import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecurringTransactionService {

  constructor(private http: HttpClient) { }

  getRecurringTransactions(accountId: string) {
    const uri = `/account/${accountId}/recurring-transactions`;
    return this.http.get(uri);
  }

  createRecurringTransaction(
    startDate: Date,
    occurrence: number,
    description: string,
    income: number,
    accountCategoryId: string,
    accountId: string) {
      const data = {
        startDate,
        occurrence,
        description,
        income,
        accountCategoryId,
        accountId
      };
      const uri = `/account/${accountId}/recurring-transaction/create`;
      return this.http.post(uri, data);
  }

  deleteRecurringTransaction(accountId: string, recurringTransactionId: string) {
    const uri = `/account/${accountId}/recurring-transaction/${recurringTransactionId}`;
    return this.http.delete(uri);
  }

}
