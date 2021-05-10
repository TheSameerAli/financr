import { AccountDetailsSettingsPageComponent } from './_pages/account-details/account-details-settings-page/account-details-settings-page.component';
import { AccountDetailsTransactionsPageComponent } from './_pages/account-details/account-details-transactions-page/account-details-transactions-page.component';
import { AccountDetailsOverviewPageComponent } from './_pages/account-details/account-details-overview-page/account-details-overview-page.component';
import { AccountsListPageComponent } from './_pages/accounts-list-page/accounts-list-page.component';
import { AddAccountPageComponent } from './_pages/add-account-page/add-account-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: AccountsListPageComponent,
    pathMatch: 'exact'
  },
  {
    path: 'create',
    component: AddAccountPageComponent,
  },
  {
    path: ':id',
    component: AccountDetailsOverviewPageComponent,
  },
  {
    path: ':id/transactions',
    component: AccountDetailsTransactionsPageComponent,
  },
  {
    path: ':id/settings',
    component: AccountDetailsSettingsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
