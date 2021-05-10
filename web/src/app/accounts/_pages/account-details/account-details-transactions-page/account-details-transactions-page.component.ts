import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details-transactions-page',
  templateUrl: './account-details-transactions-page.component.html',
  styleUrls: ['./account-details-transactions-page.component.scss']
})
export class AccountDetailsTransactionsPageComponent implements OnInit, AfterViewInit {
  data = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "Blah",
      "value": 8940000
    },
    {
      "name": "Blah2",
      "value": 5000000
    }
  ]
  constructor() { }

  ngAfterViewInit(): void {
    let pieChart = document.getElementsByClassName('ngx-charts-outer')[0];
    let balanceDiv = document.createElement('div');
    balanceDiv.classList.add('pie-chart-amount');
    balanceDiv.innerText = '£13,382.99';
    let spentSinceDiv = document.createElement('div');
    spentSinceDiv.classList.add('pie-chart-spent-since');
    spentSinceDiv.innerText = 'Spent since 28/02/2020';
    pieChart.appendChild(balanceDiv);
    pieChart.appendChild(spentSinceDiv);
  }

  ngOnInit(): void {
  }

}
