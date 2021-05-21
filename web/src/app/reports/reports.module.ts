import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsHomePageComponent } from './_pages/reports-home-page/reports-home-page.component';



@NgModule({
  declarations: [ReportsHomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
