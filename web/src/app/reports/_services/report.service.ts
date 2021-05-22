import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
const REPORTS_ENDPOINT = `${environment.api}/reports`;
const ACCOUNTS_ENDPOINT = `${environment.api}/account`;
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAllAccountReport(startDate: string, endDate: string) {
    var params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    return this.http.get(`${REPORTS_ENDPOINT}/general-report`, {params: params})
  }

  getOneAccountReport(startDate: string, endDate: string, accountId: string) {
    var params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    return this.http.get(`${REPORTS_ENDPOINT}/general-report/${accountId}`, {params: params})
  }

  getAccounts() {
    return this.http.get(`${ACCOUNTS_ENDPOINT}/list`);
  }
}
