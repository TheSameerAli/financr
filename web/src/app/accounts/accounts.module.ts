import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
