import { accountsIsLoadingSelector, currentlyViewingAccountSelector } from './../../../../../store/selector/account.selectors';
import { AppState } from './../../../../../../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from './../../../../../_models/account';
import { AccountService } from './../../../../../_services/accounts.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-display',
  templateUrl: './balance-display.component.html',
  styleUrls: ['./balance-display.component.scss']
})
export class BalanceDisplayComponent implements OnInit {
  @Input() accountId: string;
  public isLoading: Observable<boolean>;
  public account: Observable<Account>;
  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(accountsIsLoadingSelector);
    this.account = this.store.select(currentlyViewingAccountSelector);
  }

}
