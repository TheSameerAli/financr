import { getUserPreferences } from './../../../../../../shared/store/shared.selector';
import { UserPreferences } from './../../../../../../settings/_models/user-preferences';
import { accountsIsLoadingSelector, currentlyViewingAccountPreferencesSelector } from './../../../../../store/selector/account.selectors';
import { loadSpendingChartRequest } from './../../../../../store/action/account.actions';
import { SpendingChart } from './../../../../../_models/spending-chart';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { spendingChartSelector } from 'src/app/accounts/store/selector/account.selectors';
import _, { map} from 'underscore';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { AccountPreferences } from 'src/app/accounts/_models/account-preferences';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-spending-chart',
  templateUrl: './spending-chart.component.html',
  styleUrls: ['./spending-chart.component.scss']
})
export class SpendingChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() accountId: string;
  data$: Observable<SpendingChart>;
  isLoading$: Observable<boolean>;
  accountPreferences$: Observable<AccountPreferences>;
  userPreferences: Observable<UserPreferences>;
  constructor(private store: Store<AppState>, private cp: CurrencyPipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    let accountId = changes.accountId;
    this.store.dispatch(loadSpendingChartRequest({accountId: accountId.currentValue}));
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.data$ = this.store.select(spendingChartSelector);
    this.isLoading$ = this.store.select(accountsIsLoadingSelector);
    this.accountPreferences$ = this.store.select(currentlyViewingAccountPreferencesSelector);
    this.userPreferences = this.store.select(getUserPreferences);
    this.userPreferences.subscribe(uPreferences => {
      this.accountPreferences$.subscribe(aPreferences => {
        this.data$.subscribe(data => {

          // Remove previous els
          this.removeElementsByClass('pie-chart-amount');
          this.removeElementsByClass('pie-chart-spent-since');

          let pieChart = document.getElementsByClassName('ngx-charts-outer')[0];
          let balanceDiv = document.createElement('div');
          balanceDiv.classList.add('pie-chart-amount', 'text-center');
          let convertedText = '';
          if (aPreferences.currency != uPreferences.currency) {
            convertedText = '\n' + '(' + this.cp.transform(this.sumConverted(data.data), uPreferences.currency, uPreferences.currencyData.symbolNative) + ')';
          }
          balanceDiv.innerText = this.cp.transform(this.sum(data.data), aPreferences.currency, aPreferences.currencyData.symbolNative) + convertedText;
          let spentSinceDiv = document.createElement('div');
          spentSinceDiv.classList.add('pie-chart-spent-since');
          spentSinceDiv.innerText = 'Spent since ' + moment(new Date().setMonth(new Date().getMonth() - 1)).format('MM/DD/YYYY');
          pieChart.appendChild(balanceDiv);
          pieChart.appendChild(spentSinceDiv);
          this.sum(data.data);

        });
      })
    })


  }


  sum(arr) {
    // returns the sum total of all values in the array
    return _.reduce(arr, function(memo, num) { return memo + num.value}, 0);
  }

  sumConverted(arr) {
    // returns the sum total of all values in the array
    return _.reduce(arr, function(memo, num) { return memo + num.convertedValue}, 0);
  }

   removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

}
