import { AccountsListPageComponent } from './pages/app/accounts/accounts-list-page/accounts-list-page.component';
import { AuthGuard } from './core/auth.guard';
import { LogoutPageComponent } from './pages/auth/logout-page/logout-page.component';
import { HomePageComponent } from './pages/app/home-page/home-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
