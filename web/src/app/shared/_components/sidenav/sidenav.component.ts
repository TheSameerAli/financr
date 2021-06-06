import { refreshFinancialHealthRequest, refreshUserPreferencesRequest } from './../../store/shared.actions';
import { getLoading, getNetworth, getUserPreferences } from './../../store/shared.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { UserPreferences } from 'src/app/settings/_models/user-preferences';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public networth$: Observable<number>;
  public userPreferences: Observable<UserPreferences>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(refreshFinancialHealthRequest());
    this.isLoading$ = this.store.select(getLoading);
    this.networth$ = this.store.select(getNetworth);
    this.userPreferences = this.store.select(getUserPreferences);
    this.store.dispatch(refreshUserPreferencesRequest());

  }

}
