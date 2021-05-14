import { StoreModule } from '@ngrx/store';
import { AddAccountStep2Component } from './_pages/add-account-page/steps/add-account-step2/add-account-step2.component';
import { AddAccountStep1Component } from './_pages/add-account-page/steps/add-account-step1/add-account-step1.component';
import { AddAccountPageComponent } from './_pages/add-account-page/add-account-page.component';
import { AccountsListPageComponent } from './_pages/accounts-list-page/accounts-list-page.component';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './store/effects/account.effects';
import {ACCOUNT_STATE_NAME, accountReducer} from '../accounts/store/reducer/account.reducer';
import { AccountDetailsTransactionsPageComponent } from './_pages/account-details/account-details-transactions-page/account-details-transactions-page.component';
import { AccountDetailsSettingsPageComponent } from './_pages/account-details/account-details-settings-page/account-details-settings-page.component';
import { AccountDetailsContainerComponent } from './_pages/account-details/_components/account-details-container/account-details-container.component';




@NgModule({
  declarations: [
    AccountsListPageComponent,
    AddAccountPageComponent,
    AddAccountStep1Component,
    AddAccountStep2Component,
    AccountDetailsTransactionsPageComponent,
    AccountDetailsSettingsPageComponent,
    AccountDetailsContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule,
    StoreModule.forFeature(ACCOUNT_STATE_NAME, [accountReducer]),
    EffectsModule.forFeature([AccountEffects])
  ]
})
export class AccountsModule { }
