import { TitleService } from './../../../shared/_services/title.service';
import { accountsIsLoadingSelector } from './../../store/selector/account.selectors';
import { Account } from './../../_models/account';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { createAccountRequest } from '../../store/action/account.actions'
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-add-account-page',
  templateUrl: './add-account-page.component.html',
  styleUrls: ['./add-account-page.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class AddAccountPageComponent implements OnInit {
  public step: number = 1;
  public accountType: number;
  public isLoading$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('New Account');
    this.isLoading$ = this.store.select(accountsIsLoadingSelector);
  }

  accountSelection(data: number) {
    this.accountType = data;
    this.step = 2;
  }

  createAccount(data: Account) {
    this.store.dispatch(createAccountRequest({
      account: {
        id: '',
        name: data.name,
        type: this.accountType,
        balance: data.balance,
        userId: '',
        transactions: [],
        availableBalance: 0
      }
    }));
  }

}
