import { loadCurrentlyViewingAccountRequest } from './../../../../store/action/account.actions';
import { Observable } from 'rxjs';
import { currentlyViewingAccountSelector, accountsIsLoadingSelector, currentlyViewingAccountLoadingSelector } from './../../../../store/selector/account.selectors';
import { Store } from '@ngrx/store';
import { AppState } from './../../../../../app.state';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details-container',
  templateUrl: './account-details-container.component.html',
  styleUrls: ['./account-details-container.component.scss']
})
export class AccountDetailsContainerComponent implements OnInit {
  public accountId: string;
  public account$: Observable<Account>;
  public isLoading$: Observable<Account>;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.route.params.subscribe(p => {
      this.accountId = p['id'];
    });
  }

  ngOnInit(): void {
    this.account$ = this.store.select(currentlyViewingAccountSelector);
    this.isLoading$ = this.store.select(currentlyViewingAccountLoadingSelector);

    this.account$.subscribe(account => {
      console.log(account);
      if (account === undefined || account.id !== this.accountId) {
        this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
      }
    }).unsubscribe();
  }

}
