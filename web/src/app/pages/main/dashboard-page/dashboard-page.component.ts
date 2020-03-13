import { DatePipe } from '@angular/common';
import { LineChartData } from './../../../models/charts/line-chart-data';
import { MonthlyNetworth } from './../../../models/monthly-networth';
import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public mainChart: LineChartData;
  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getNetworthByMonth();
  }

  generateMainChart(data: MonthlyNetworth[]) {
    const chartData = data.map(d => d.amount);
    const labels = data.map(d => this.datePipe.transform(new Date(d.month), 'MMMM, yyyy'));
    this.mainChart = {
      datasets: [
        {
          data: chartData,
          label: 'Net Worth'
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
      ],
    };
    console.log(this.mainChart);
  }

  private getNetworthByMonth() {
    this.dashboardService.getNetworthByMonth().subscribe((data: MonthlyNetworth[]) => {
      this.generateMainChart(data);
    });
  }

}
