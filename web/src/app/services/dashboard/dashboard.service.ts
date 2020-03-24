import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardData() {
    const uri = `/dashboard/dashboard-data`;
    return this.http.get(uri);
  }

  getNetworthByMonth() {
    const uri = `/dashboard/dashboard-chart`;
    return this.http.get(uri);
  }
}
