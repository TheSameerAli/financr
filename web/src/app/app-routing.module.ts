import { DangerZonePageComponent } from './pages/account/danger-zone-page/danger-zone-page.component';
import { ReportsPageComponent } from './pages/account/reports-page/reports-page.component';
import { TransactionsPageComponent } from './pages/account/transactions-page/transactions-page.component';
import { AccountCategoriesPageComponent } from './pages/account/account-categories-page/account-categories-page.component';
import { AccountPageComponent } from './pages/account/account-page/account-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { DashboardPageComponent } from './pages/main/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id/dashboard',
    component: AccountPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id/categories',
    component: AccountCategoriesPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id/transactions',
    component: TransactionsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id/reports',
    component: ReportsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/:id/danger',
    component: DangerZonePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
