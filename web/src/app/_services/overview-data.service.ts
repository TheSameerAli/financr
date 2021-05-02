import { FinancialHealth } from './../models/data/financial-health';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_ENDPOINT = 'http://localhost:5000'
@Injectable({
  providedIn: 'root'
})
export class OverviewDataService {

  constructor(private http: HttpClient) { }

  public getFinancialHealth() : Observable<FinancialHealth> {
    return this.http.get<FinancialHealth>(`${API_ENDPOINT}/overview/financial-health`);
  }
}
