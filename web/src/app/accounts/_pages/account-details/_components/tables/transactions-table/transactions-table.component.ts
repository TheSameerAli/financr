import { refreshFinancialHealthRequest } from './../../../../../../shared/store/shared.actions';
import { AccountService } from './../../../../../_services/accounts.service';
import { Observable } from 'rxjs';
import { accountsIsLoadingSelector, currentlyViewingAccountTransactionsSelector, currentlyViewingAccountPreferencesSelector } from './../../../../../store/selector/account.selectors';
import { loadCurrentlyViewingAccountTransactionsRequest, loadCurrentlyViewingAccountRequest, loadSpendingChartRequest } from './../../../../../store/action/account.actions';
import { Store } from '@ngrx/store';
import { Transaction } from './../../../../../_models/transaction';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { AccountPreferences } from 'src/app/accounts/_models/account-preferences';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() accountId: string;
  @Output() selection: EventEmitter<string> = new EventEmitter();
  @Output() openEdit: EventEmitter<string> = new EventEmitter();
  public isLoading: Observable<boolean>;
  public transactions$: Observable<{}>;
  public isDeleteLoading: boolean = false;
  public accountPreferences: Observable<AccountPreferences>;
  constructor(private store: Store<AppState>, private accountService: AccountService) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(accountsIsLoadingSelector);
    this.transactions$ = this.store.select(currentlyViewingAccountTransactionsSelector);
    this.accountPreferences = this.store.select(currentlyViewingAccountPreferencesSelector);
    this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));
  }

  selectTransaction(transactionId) {
    this.selection.emit(transactionId);
  }

  deleteTransaction(transactionId: string) {
    this.isDeleteLoading = true;
    this.accountService.deleteTransaction(this.accountId, transactionId).subscribe(data => {
      this.isDeleteLoading = false;
      this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));
      this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
      this.store.dispatch(refreshFinancialHealthRequest());
      this.store.dispatch(loadSpendingChartRequest({accountId: this.accountId}));
    }, (err) => {
      this.isDeleteLoading = false;
    });
  }

}
