import { AuthGuard } from './authentication/_guards/auth.guard';
import { AddAccountPageComponent } from './accounts/_pages/add-account-page/add-account-page.component';
import { HomePageComponent } from './dashboard/_pages/home-page/home-page.component';
import { LogoutPageComponent } from './authentication/_pages/logout-page/logout-page.component';
import { LoginPageComponent } from './authentication/_pages/login-page/login-page.component';
import { AccountDetailsPageComponent } from './accounts/_pages/account-details-page/account-details-page.component';
import { AccountsListPageComponent } from './accounts/_pages/accounts-list-page/accounts-list-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    component: AccountsListPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/create',
    component: AddAccountPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id',
    component: AccountDetailsPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
