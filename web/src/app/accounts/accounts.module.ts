import { StoreModule } from '@ngrx/store';
import { AddAccountStep2Component } from './_pages/add-account-page/steps/add-account-step2/add-account-step2.component';
import { AddAccountStep1Component } from './_pages/add-account-page/steps/add-account-step1/add-account-step1.component';
import { AddAccountPageComponent } from './_pages/add-account-page/add-account-page.component';
import { AccountsListPageComponent } from './_pages/accounts-list-page/accounts-list-page.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './store/effects/account.effects';
import {ACCOUNT_STATE_NAME, accountReducer} from '../accounts/store/reducer/account.reducer';
import { AccountDetailsTransactionsPageComponent } from './_pages/account-details/account-details-transactions-page/account-details-transactions-page.component';
import { AccountDetailsSettingsPageComponent } from './_pages/account-details/account-details-settings-page/account-details-settings-page.component';
import { AccountDetailsContainerComponent } from './_pages/account-details/_components/account-details-container/account-details-container.component';
import { AddTransactionPanelComponent } from './_pages/account-details/_components/panels/add-transaction-panel/add-transaction-panel.component';
import { ViewTransactionPanelComponent } from './_pages/account-details/_components/panels/view-transaction-panel/view-transaction-panel.component';
import { TransactionsTableComponent } from './_pages/account-details/_components/tables/transactions-table/transactions-table.component';
import { BalanceDisplayComponent } from './_pages/account-details/_components/data-components/balance-display/balance-display.component';
import { SpendingChartComponent } from './_pages/account-details/_components/data-components/spending-chart/spending-chart.component';
import { CategoryManagementSectionComponent } from './_pages/account-details/account-details-settings-page/_components/category-management-section/category-management-section.component';
import { PreferencesManagementSectionComponent } from './_pages/account-details/account-details-settings-page/_components/preferences-management-section/preferences-management-section.component';
import { DangerZoneSectionComponent } from './_pages/account-details/account-details-settings-page/_components/danger-zone-section/danger-zone-section.component';



@NgModule({
  declarations: [
    AccountsListPageComponent,
    AddAccountPageComponent,
    AddAccountStep1Component,
    AddAccountStep2Component,
    AccountDetailsTransactionsPageComponent,
    AccountDetailsSettingsPageComponent,
    AccountDetailsContainerComponent,
    AddTransactionPanelComponent,
    ViewTransactionPanelComponent,
    TransactionsTableComponent,
    BalanceDisplayComponent,
    SpendingChartComponent,
    CategoryManagementSectionComponent,
    PreferencesManagementSectionComponent,
    DangerZoneSectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule,
    StoreModule.forFeature(ACCOUNT_STATE_NAME, [accountReducer]),
    EffectsModule.forFeature([AccountEffects]),
  ],
  providers: [CurrencyPipe]
})
export class AccountsModule { }
