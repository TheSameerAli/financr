import { getUserPreferences } from './../../../../../../shared/store/shared.selector';
import { UserPreferences } from 'src/app/settings/_models/user-preferences';
import { accountsIsLoadingSelector, currentlyViewingAccountSelector, currentlyViewingAccountPreferencesSelector } from './../../../../../store/selector/account.selectors';
import { AppState } from './../../../../../../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from './../../../../../_models/account';
import { AccountService } from './../../../../../_services/accounts.service';
import { Component, Input, OnInit } from '@angular/core';
import { AccountPreferences } from 'src/app/accounts/_models/account-preferences';

@Component({
  selector: 'app-balance-display',
  templateUrl: './balance-display.component.html',
  styleUrls: ['./balance-display.component.scss']
})
export class BalanceDisplayComponent implements OnInit {
  @Input() accountId: string;
  public isLoading: Observable<boolean>;
  public account: Observable<Account>;
  public accountPreferences: Observable<AccountPreferences>;
  public userPreferences: Observable<UserPreferences>;
  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(accountsIsLoadingSelector);
    this.account = this.store.select(currentlyViewingAccountSelector);
    this.accountPreferences = this.store.select(currentlyViewingAccountPreferencesSelector);
    this.userPreferences = this.store.select(getUserPreferences);
  }

}
