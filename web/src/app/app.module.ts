import { AccountPageMenuComponent } from './pages/account/components/account-page-menu/account-page-menu.component';
import { UserService } from './services/user/user.service';
import { User } from './models/user';
import { AuthService } from './services/user/auth.service';
import { APIInterceptor } from './interceptors/api.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { DashboardPageComponent } from './pages/main/dashboard-page/dashboard-page.component';
import { MenuComponent } from './layouts/header/menu/menu.component';
import { AccountsPanelComponent } from './components/account/accounts-panel/accounts-panel.component';
import { TransactionsPanelComponent } from './components/account/transactions-panel/transactions-panel.component';
import { LeftSidebarComponent } from './layouts/sidebar/left-sidebar/left-sidebar.component';
import { AccountPageComponent } from './pages/account/account-page/account-page.component';
import { AccountCategoriesPageComponent } from './pages/account/account-categories-page/account-categories-page.component';
import { WebModalComponent } from './components/partials/modals/web-modal/web-modal.component';
import { TransactionsPageComponent } from './pages/account/transactions-page/transactions-page.component';
import { ReportsPageComponent } from './pages/account/reports-page/reports-page.component';
import { DangerZonePageComponent } from './pages/account/danger-zone-page/danger-zone-page.component';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FinancialBreakdownComponent } from './components/financial-components/financial-breakdown/financial-breakdown.component';
import { LocalStorage } from './models/local-storage';

export function localStorageFactory() {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    MenuComponent,
    AccountsPanelComponent,
    TransactionsPanelComponent,
    LeftSidebarComponent,
    AccountPageComponent,
    AccountPageMenuComponent,
    AccountCategoriesPageComponent,
    WebModalComponent,
    TransactionsPageComponent,
    ReportsPageComponent,
    DangerZonePageComponent,
    FinancialBreakdownComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  }, DatePipe, CurrencyPipe,
  {provide: LocalStorage, useFactory: localStorageFactory}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
