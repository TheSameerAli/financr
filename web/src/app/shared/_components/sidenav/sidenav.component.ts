import { refreshFinancialHealthRequest } from './../../store/shared.actions';
import { getLoading, getNetworth} from './../../store/shared.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public networth$: Observable<number>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(refreshFinancialHealthRequest());
    this.isLoading$ = this.store.select(getLoading);
    this.networth$ = this.store.select(getNetworth);

  }

}
