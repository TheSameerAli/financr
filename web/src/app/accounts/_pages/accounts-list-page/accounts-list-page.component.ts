import { AccountState } from './../../store/reducer/account.reducer';
import { Observable } from 'rxjs';
import { AppState } from './../../../app.state';
import { select, Store } from '@ngrx/store';
import { Account } from './../../_models/account';
import { AccountService } from './../../_services/accounts.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { loadAccountsRequest } from '../../store/action/account.actions';
import { getLoading } from '../../../shared/store/shared.selector';


@Component({
  selector: 'app-accounts-list-page',
  templateUrl: './accounts-list-page.component.html',
  styleUrls: ['./accounts-list-page.component.scss']
})
export class AccountsListPageComponent implements OnInit {
  public accounts$: Observable<Account[]> = this.store.pipe(select(state => state.accounts));
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
    this.isLoading$ = this.store.select(getLoading);
    this.store.dispatch(loadAccountsRequest());
  }

  toAccount(id) {
    this.router.navigate(['/accounts', id]);
  }

}
