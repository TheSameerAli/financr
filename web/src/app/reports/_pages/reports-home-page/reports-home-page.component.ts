import { Store } from '@ngrx/store';
import { getUserPreferences } from './../../../shared/store/shared.selector';
import { UserPreferences } from './../../../settings/_models/user-preferences';
import { Observable } from 'rxjs';
import { accountReducer } from './../../../accounts/store/reducer/account.reducer';
import { GeneralReport } from './../../_models/general.report';
import { ReportService } from './../../_services/report.service';
import { ActivatedRoute, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { TitleService } from './../../../shared/_services/title.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import Pikaday from 'pikaday';
import * as moment from 'moment';
import * as _ from 'lodash';
import { AppState } from 'src/app/app.state';

const DATE_FORMAT = 'MM/DD/YYYY'

@Component({
  selector: 'app-reports-home-page',
  templateUrl: './reports-home-page.component.html',
  styleUrls: ['./reports-home-page.component.scss']
})
export class ReportsHomePageComponent implements OnInit, AfterViewInit {
  public startDate: string;
  public endDate: string;
  public isLoading: boolean = false;
  public reportData: GeneralReport;

  public accountId: string = 'all';
  public accounts: {id: string, name: string}[];
  public userPreferences: Observable<UserPreferences>;

  private incomeTransactions: {categoryName: string, total: number}[] = [];
  private expenseTransactions: {categoryName: string, total: number}[] = [];

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private store: Store<AppState>
    ) {
    let startDate = moment(new Date().setMonth(new Date().getMonth() - 1)).format(DATE_FORMAT).toString();
    let endDate = moment(new Date()).format(DATE_FORMAT).toString();
    if (this.route.snapshot.queryParams['startDate'] === undefined) {
      this.changeDate(startDate, endDate);
    }
  }

  ngAfterViewInit(): void {
    var fromPicker = new Pikaday(
      {
        field: document.getElementById('from-date-picker'),
        trigger: document.getElementById('from-date-picker'),
        format: DATE_FORMAT,
        onSelect: (ev: Date) => {
          this.changeDate(moment(ev).format(DATE_FORMAT), this.route.snapshot.queryParams['endDate']);
        }
      }
      );

      var toPicker = new Pikaday(
        {
          field: document.getElementById('to-date-picker'),
          trigger: document.getElementById('to-date-picker'),
          format: DATE_FORMAT,
          onSelect: (ev: Date) => {
            this.changeDate(this.route.snapshot.queryParams['startDate'], moment(ev).format(DATE_FORMAT));
          }
        }
        );

      fromPicker.setDate(moment(this.route.snapshot.queryParams['startDate']).format(DATE_FORMAT));
      toPicker.setDate(this.route.snapshot.queryParams['endDate']);

      this.loadData();
      this.loadAccounts();
  }

  loadAccounts() {
    this.reportService.getAccounts().subscribe((data: {id: string, name: string}[]) => {
      this.accounts = data;
    })
  }

  loadData() {
    this.isLoading = true;
    if (this.accountId === 'all') {
      this.reportService.getAllAccountReport(this.startDate, this.endDate).subscribe((data: GeneralReport) => {
        this.incomeTransactions = []
        this.expenseTransactions = [];
        data.incomeTransactions.forEach(element => {
          this.incomeTransactions.push({categoryName: element[0].categoryName, total: _.sum(element.map(t => t.total))});
        });
        data.expenseTransactions.forEach(element => {
          this.expenseTransactions.push({categoryName: element[0].categoryName, total: _.sum(element.map(t => t.total))});
        });
        this.isLoading = false;
        this.reportData = data;
      }, (err) => {
        this.isLoading = false;
      })
    } else {
      this.reportService.getOneAccountReport(this.startDate, this.endDate, this.accountId).subscribe((data: GeneralReport) => {
        this.incomeTransactions = []
        this.expenseTransactions = [];
        data.incomeTransactions.forEach(element => {
          this.incomeTransactions.push({categoryName: element[0].categoryName, total: _.sum(element.map(t => t.total))});
        });
        data.expenseTransactions.forEach(element => {
          this.expenseTransactions.push({categoryName: element[0].categoryName, total: _.sum(element.map(t => t.total))});
        });
        this.isLoading = false;
        this.reportData = data;
      }, (err) => {
        this.isLoading = false;
      })
    }

  }

  changeDate(startDate: string, endDate: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {startDate: startDate, endDate: endDate}
    });

    this.startDate = startDate;
    this.endDate = endDate;

  }

  ngOnInit(): void {
    this.titleService.setTitle('Report');
    this.userPreferences = this.store.select(getUserPreferences);

  }



}
