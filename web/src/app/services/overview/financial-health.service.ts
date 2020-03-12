import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinancialHealthService {

  constructor(private http: HttpClient) { }

  getFinancialHealth() {
    const uri = `/overview/financial-health`;
    return this.http.get(uri);
  }
}
