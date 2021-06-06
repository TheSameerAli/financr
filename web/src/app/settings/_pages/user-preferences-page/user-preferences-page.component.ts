import { refreshUserPreferencesRequest, refreshFinancialHealthRequest } from './../../../shared/store/shared.actions';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UserPreferences } from './../../_models/user-preferences';
import { UserPreferencesService } from './../../_services/user-preferences.service';
import { Currency } from './../../../shared/_models/currency';
import { CurrencyService } from './../../../shared/_services/currency.service';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-user-preferences-page',
  templateUrl: './user-preferences-page.component.html',
  styleUrls: ['./user-preferences-page.component.scss']
})
export class UserPreferencesPageComponent implements OnInit {
  public currencies: Currency[];
  public isLoading: boolean = false;
  public preferences: UserPreferences;
  public selectedCurrency: string;
  public isButtonLoading: boolean = false;

  constructor(
    private currencyService: CurrencyService,
    private userPreferencesService: UserPreferencesService,
    private toastr: ToastrService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.currencyService.getAllCurrencies().subscribe((data: Currency[]) => {
      this.currencies = data;
      this.userPreferencesService.getPreferences().subscribe(userPreferences => {
        this.selectedCurrency = this.currencies.find(c => c.code === userPreferences.currency).code;
        this.preferences = userPreferences;
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
      })
    }, (err) => {
      this.isLoading = false;
    })
  }

  changeCurrency() {
    this.isButtonLoading = true;
    this.userPreferencesService.changeCurrency(this.selectedCurrency).subscribe(data => {
      this.isButtonLoading = false;
      this.store.dispatch(refreshUserPreferencesRequest());
      this.store.dispatch(refreshFinancialHealthRequest());
      this.toastr.success('Changes have been saved successfully.', 'Saved!');
    }, (err) => {
      this.isButtonLoading = false;
      this.toastr.error('Error saving the change. Please try again later', 'Error');
    })

  }

}
