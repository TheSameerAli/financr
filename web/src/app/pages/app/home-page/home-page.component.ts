
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public timeFrame: string = moment().subtract(1, 'month').format('DD MMM') + ' - ' + moment().format('DD MMM');

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  data = [
    {
      "name": "Burundi",
      "series": [
        {
          "value": 2670,
          "name": "1"
        },
        {
          "value": 5095,
          "name": "2"
        },
        {
          "value": 4172,
          "name": "3"
        },
        {
          "value": 4402,
          "name": "4"
        },
        {
          "value": 2096,
          "name": "5"
        },
        {
          "value": 2670,
          "name": "6"
        },
        {
          "value": 5095,
          "name": "7"
        },
        {
          "value": 4172,
          "name": "8"
        },
        {
          "value": 4402,
          "name": "9"
        },
        {
          "value": 1938,
          "name": "10"
        }
      ]
    },




  ];

  colorScheme = {
    domain: ['#145DA0']
  };

  constructor() {
    Object.assign(this, { multi: this.multi });
  }

  ngOnInit(): void {

  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



}
