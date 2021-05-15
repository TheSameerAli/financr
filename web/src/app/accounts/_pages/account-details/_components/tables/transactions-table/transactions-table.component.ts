import { Observable } from 'rxjs';
import { accountsIsLoadingSelector, currentlyViewingAccountTransactionsSelector } from './../../../../../store/selector/account.selectors';
import { loadCurrentlyViewingAccountTransactionsRequest } from './../../../../../store/action/account.actions';
import { Store } from '@ngrx/store';
import { Transaction } from './../../../../../_models/transaction';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() accountId: string;
  @Output() selection: EventEmitter<string> = new EventEmitter();
  public isLoading: Observable<boolean>;
  public transactions: Observable<Transaction[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(accountsIsLoadingSelector);
    this.transactions = this.store.select(currentlyViewingAccountTransactionsSelector);
    this.store.dispatch(loadCurrentlyViewingAccountTransactionsRequest({accountId: this.accountId}));
  }

  selectTransaction(transactionId) {
    this.selection.emit(transactionId);
  }

}
