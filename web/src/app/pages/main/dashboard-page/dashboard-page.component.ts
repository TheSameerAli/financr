import { RecurringTransaction } from './../../../models/recurring-transaction';
import { AccountService } from './../../../services/account/account.service';
import { DashboardData } from './../../../models/dashboard-data';
import { DashboardChartData } from './../../../models/dashboard-chart-data';
import { DatePipe } from '@angular/common';
import { LineChartData } from './../../../models/charts/line-chart-data';
import { MonthlyValues } from '../../../models/monthly-values';
import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public mainChart: LineChartData;
  public dashboardData: DashboardData;
  public subscriptions: RecurringTransaction[];
  constructor(
    private dashboardService: DashboardService,
    private datePipe: DatePipe,
    private accountService: AccountService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Dashboard | Financr');
    this.getNetworthByMonth();
    this.getDashboardData();
    this.getSubscriptions();
  }

  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe((data: DashboardData) => {
      this.dashboardData = data;
    });
  }

  getSubscriptions() {
    this.accountService.getSubscriptions().subscribe((data: RecurringTransaction[]) => {
      this.subscriptions = data;
    });
  }

  generateMainChart(dashboardData: DashboardChartData) {
    const networth = dashboardData.networth;
    const spending = dashboardData.spending;

    const netWorthData = networth.map(d => d.amount);
    const spendingData = spending.map(d => d.amount * -1);
    const labels = networth.map(d => this.datePipe.transform(new Date(d.month), 'MMMM, yyyy'));

    this.mainChart = {
      datasets: [
        {
          data: netWorthData,
          label: 'Net Worth'
        },
        {
          data: spendingData,
          label: 'Spending'
        }
      ],
      labels,
      options: {
        fill: false,
      },
      colors: [
        { // green
          backgroundColor: 'rgba(0, 0, 0,0)',
          borderColor: 'rgba(46, 204, 113,1.0)',
          pointBackgroundColor: 'rgba(46, 204, 113,1.0)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(39, 174, 96,1.0)'
        },
        { // red
          backgroundColor: 'rgba(0, 0, 0,0)',
          borderColor: 'rgba(231, 76, 60,1.0)',
          pointBackgroundColor: 'rgba(231, 76, 60,1.0)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(192, 57, 43,1.0)'
        },
      ],
    };
  }

  private getNetworthByMonth() {
    this.dashboardService.getNetworthByMonth().subscribe((data: DashboardChartData) => {
      this.generateMainChart(data);
    });
  }

}
