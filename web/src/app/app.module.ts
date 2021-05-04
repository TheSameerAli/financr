import { AuthGuard } from './core/auth.guard';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { FeatherModule } from 'angular-feather';
import { ArrowDownRight, ArrowUpRight, ArrowRightCircle, Home } from 'angular-feather/icons';
import { LottieModule } from 'ngx-lottie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HomePageComponent } from './pages/app/home-page/home-page.component';
import { LogoutPageComponent } from './pages/auth/logout-page/logout-page.component';
import { SidenavComponent } from './components/layouts/navbar/sidenav/sidenav.component';
import { FigureBoxComponent } from './components/ui-components/figure-box/figure-box.component';
import { AccountsListPageComponent } from './pages/app/accounts/accounts-list-page/accounts-list-page.component';

const icons = {
  ArrowRightCircle,
  ArrowUpRight,
  ArrowDownRight,
  Home
};


export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    LogoutPageComponent,
    SidenavComponent,
    FigureBoxComponent,
    AccountsListPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FeatherModule.pick(icons),
    LottieModule.forRoot({ player: playerFactory }),
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
