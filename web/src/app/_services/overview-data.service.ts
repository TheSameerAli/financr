import { environment } from './../../environments/environment';
import { FinancialHealth } from './../models/data/financial-health';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_ENDPOINT = environment.api;
@Injectable({
  providedIn: 'root'
})
export class OverviewDataService {

  constructor(private http: HttpClient) { }

  public getFinancialHealth() : Observable<FinancialHealth> {
    return this.http.get<FinancialHealth>(`${API_ENDPOINT}/overview/financial-health`);
  }
}
