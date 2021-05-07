import { AddAccountStep2Component } from './_pages/add-account-page/steps/add-account-step2/add-account-step2.component';
import { AddAccountStep1Component } from './_pages/add-account-page/steps/add-account-step1/add-account-step1.component';
import { AddAccountPageComponent } from './_pages/add-account-page/add-account-page.component';
import { AccountsListPageComponent } from './_pages/accounts-list-page/accounts-list-page.component';
import { AccountDetailsPageComponent } from './_pages/account-details-page/account-details-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    AccountDetailsPageComponent,
    AccountsListPageComponent,
    AddAccountPageComponent,
    AddAccountStep1Component,
    AddAccountStep2Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
