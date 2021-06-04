import { currentlyViewingAccountPreferencesSelector } from './../../../../../store/selector/account.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountService } from './../../../../../_services/accounts.service';
import { Transaction } from './../../../../../_models/transaction';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AccountPreferences } from 'src/app/accounts/_models/account-preferences';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-view-transaction-panel',
  templateUrl: './view-transaction-panel.component.html',
  styleUrls: ['./view-transaction-panel.component.scss']
})
export class ViewTransactionPanelComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  public transaction: Transaction;
  @Input() transactionId: string;
  @Input() accountId: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  public isLoading: boolean = false;
  public accountPreferences: Observable<AccountPreferences>;
  constructor(private accountService: AccountService, private store: Store<AppState>) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.accountPreferences = this.store.select(currentlyViewingAccountPreferencesSelector);
    this.loadTransaction(this.transactionId);
  }

  loadTransaction(transactionId: string) {
    this.isLoading = true;
    this.accountService.getTransaction(this.accountId, transactionId).subscribe(data => {
      this.isLoading = false;
      this.transaction = data;
    }, (err) => {
      this.isLoading = false;
    })
  }

  closePanel() {
    this.transaction = undefined;
    this.close.emit();
  }

  ngOnInit(): void {
    this.accountPreferences = this.store.select(currentlyViewingAccountPreferencesSelector);

  }

}
