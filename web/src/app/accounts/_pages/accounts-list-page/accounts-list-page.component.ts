import { accountsIsLoadingSelector, selectAccounts } from './../../store/selector/account.selectors';
import { AccountState } from './../../store/reducer/account.reducer';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Account } from './../../_models/account';
import { AccountService } from './../../_services/accounts.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { loadAccountsRequest } from '../../store/action/account.actions';


@Component({
  selector: 'app-accounts-list-page',
  templateUrl: './accounts-list-page.component.html',
  styleUrls: ['./accounts-list-page.component.scss']
})
export class AccountsListPageComponent implements OnInit {
  public accounts$: Observable<Account[]>;
  public isLoading$: Observable<boolean>;
  public accountIcons = {
    0: '/assets/icons/bank.svg',
    1: '/assets/icons/investment.svg',
    2: '/assets/icons/savings.svg',
    3: '/assets/icons/loan.svg'
  }

  constructor(
    private accountService: AccountService,
    private router: Router,
    private store: Store<AccountState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadAccountsRequest());
    this.accounts$ = this.store.select(selectAccounts);
    this.isLoading$ = this.store.select(accountsIsLoadingSelector);
  }

  toAccount(id) {
    this.router.navigate(['/accounts', id]);
  }

}
