import { AuthGuard } from './authentication/_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(a => a.AuthenticationModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(a => a.AccountsModule),
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
