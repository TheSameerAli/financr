import { Transaction } from './../../../_models/transaction';
import { AccountService } from './../../../_services/accounts.service';
import { Account } from './../../../_models/account';
import { selectAccounts } from './../../../store/selector/account.selectors';
import { ActivatedRoute } from '@angular/router';
import { loadAccountTransactionsRequest, loadAccountsRequest } from './../../../store/action/account.actions';
import { Store } from '@ngrx/store';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-details-transactions-page',
  templateUrl: './account-details-transactions-page.component.html',
  styleUrls: ['./account-details-transactions-page.component.scss']
})
export class AccountDetailsTransactionsPageComponent implements OnInit, AfterViewInit {
  public accountId: string;
  public transactions: Transaction[];
  public transactionsLoading: boolean = false;
  public singleTransactionBoxOpen: boolean = false;
  public isSingleTransactionLoading: boolean = false;
  public transactionData: Transaction;
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
  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

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
    this.route.params.subscribe(p => {
      this.accountId = p['id'];
    });
    this.transactionsLoading = true;
    this.accountService.getTransactions(this.accountId).subscribe(data => {
      this.transactions = data;
      this.transactionsLoading = false;

    }, (err) => {
      this.transactionsLoading = false;
    });
  }

  openSingleTransactionBox(transactionId: string) {
    this.singleTransactionBoxOpen = true;
    this.isSingleTransactionLoading = true;
    this.accountService.getTransaction(this.accountId, transactionId).subscribe(data => {
      this.transactionData = data;
      this.isSingleTransactionLoading = false;
    }, (err) => {
      this.isSingleTransactionLoading = false;
    })
  }

  closeSingleTransactionBox() {
    this.transactionData = new Transaction();
    this.isSingleTransactionLoading = false;
    this.singleTransactionBoxOpen = false;
  }

}
