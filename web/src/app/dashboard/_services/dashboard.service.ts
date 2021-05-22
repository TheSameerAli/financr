import { Observable } from 'rxjs';
import { DashboardData } from './../_models/dashboard.data';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const DASHBOARD_ENDPOINT = `${environment.api}/dashboard`

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${DASHBOARD_ENDPOINT}/dashboard-data`);
  }
}
