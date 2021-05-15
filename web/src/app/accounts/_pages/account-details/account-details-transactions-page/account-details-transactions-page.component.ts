import { Transaction, AccountCategory } from './../../../_models/transaction';
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

  public singleTransactionBoxOpen: boolean = false;
  public addTransactionBoxOpen: boolean = false;
  public currentSelectedTransactionId: string = '';


  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.accountId = p['id'];
    });

  }

  openSingleTransactionBox(transactionId: string) {
    this.singleTransactionBoxOpen = true;
    this.currentSelectedTransactionId = transactionId;
  }

  closeSingleTransactionBox() {
    this.singleTransactionBoxOpen = false;
  }

  closeAddTransactionBox() {
    this.addTransactionBoxOpen = false;
  }

  openAddTransactionBox() {
    this.addTransactionBoxOpen = true;
  }



}
