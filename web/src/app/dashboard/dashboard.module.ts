import { DashboardRoutingModule } from './dashboard-routing.module';
import { FigureBoxComponent } from './_components/figure-box/figure-box.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './_pages/home-page/home-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    FigureBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
})
export class DashboardModule { }
