import {
  NetworthChart
} from './../../_models/networth-chart';
import {
  DashboardData
} from './../../_models/dashboard.data';
import {
  DashboardService
} from './../../_services/dashboard.service';
import {
  TitleService
} from './../../../shared/_services/title.service';

import {
  Component,
  OnInit
} from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public timeFrame: string = moment().subtract(1, 'month').format('DD MMM') + ' - ' + moment().format('DD MMM');

  public dashboardData: DashboardData;
  public isDashboardDataLoading: boolean = false;

  public isChartLoading: boolean = false;

  public networthCharts: NetworthChart[];
  public selectedTimeframe: string = '1W';

  multi: any[];

  // options
  chartData = [{
    "name": "Balance",
    "series": []
  }, ];

  colorScheme = {
    domain: ['#145DA0']
  };

  constructor(private titleService: TitleService, private dashboardService: DashboardService) {
    Object.assign(this, {
      multi: this.multi
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard');
    this.loadDashboardData();
    this.loadNetworthChart();
  }

  loadNetworthChart() {
    this.isChartLoading = true;
    this.dashboardService.getNetworthChart().subscribe((data: NetworthChart[]) => {
      this.networthCharts = data;
      this.selectChart(this.selectedTimeframe);
      this.isChartLoading = false;
    })
  }

  selectChart(time: string) {
    this.chartData[0].series = [];
    this.isChartLoading = true;
    setTimeout(() => {
      let d = this.networthCharts.find(nc => nc.timeframe === time).chartData.map(data => {
        return {
          name: moment(Date.parse(data.name)).format('L'),
          value: data.value
        }
      })

      this.chartData[0].series = d;
      this.selectedTimeframe = time;
      this.isChartLoading = false;
    }, 100);

  }

  loadDashboardData() {
    this.isDashboardDataLoading = true;
    this.dashboardService.getDashboardData().subscribe((data: DashboardData) => {
      this.dashboardData = data;
      this.isDashboardDataLoading = false;
    }, (err) => {
      this.isDashboardDataLoading = false;
    });
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }



}
