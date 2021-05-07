import { AccountsListPageComponent } from './_pages/accounts-list-page/accounts-list-page.component';
import { AccountDetailsPageComponent } from './_pages/account-details-page/account-details-page.component';
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
    component: AccountDetailsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
