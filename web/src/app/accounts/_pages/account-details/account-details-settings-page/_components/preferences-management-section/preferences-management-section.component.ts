import { Currency } from './../../../../../../shared/_models/currency';
import { CurrencyService } from './../../../../../../shared/_services/currency.service';
import { loadCurrentlyViewingAccountRequest } from './../../../../../store/action/account.actions';
import { AppState } from './../../../../../../app.state';
import { Store } from '@ngrx/store';
import { AccountPreferences } from './../../../../../_models/account-preferences';
import { AccountService } from './../../../../../_services/accounts.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preferences-management-section',
  templateUrl: './preferences-management-section.component.html',
  styleUrls: ['./preferences-management-section.component.scss']
})
export class PreferencesManagementSectionComponent implements OnInit {
  @Input('accountId') accountId: string;
  public isLoading: boolean = false;
  public isButtonLoading: boolean = false;
  public currencies: Currency[];
  public preferences: AccountPreferences;
  public selectedCurrencyCode: string;
  constructor(private accountService: AccountService, private toastr: ToastrService, private store: Store<AppState>, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadCurrentPreferences();
  }

  loadCurrencies() {
    this.isLoading = true;
    this.currencyService.getAllCurrencies().subscribe((data: Currency[]) => {
      this.currencies = data;
      this.selectedCurrencyCode = data.find(c => c.code === this.preferences.currency).code;
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
    })

  }

  loadCurrentPreferences() {
    this.isLoading = true;
    this.accountService.getAccountPreferences(this.accountId).subscribe((data: AccountPreferences) => {
      this.isLoading = false;
      this.preferences = data;
      this.loadCurrencies();
    }, (err) => {
      this.isLoading = false;
    })
  }

  savePreferences() {
    this.isButtonLoading = true;
    this.accountService.saveAccountPreferences(this.accountId, this.selectedCurrencyCode).subscribe(data => {
      this.isButtonLoading = false;
      this.toastr.success('Preferences have been saved', 'Saved!');
      this.store.dispatch(loadCurrentlyViewingAccountRequest({accountId: this.accountId}));
    }, (err) => {
      this.isButtonLoading = false;
      this.toastr.error('Error saving preferences. Please try again later.', 'Error');
    });
  }

}
