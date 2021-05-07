import { FinancialHealth } from './../_models/financial-health';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_ENDPOINT = environment.api;
@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private http: HttpClient) { }

  public getFinancialHealth() : Observable<FinancialHealth> {
    return this.http.get<FinancialHealth>(`${API_ENDPOINT}/overview/financial-health`);
  }
}
