import { AppRoutingModule } from './../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IconsModule } from '../ui-modules/icons/icons.module';
import { SidenavComponent } from './../shared/_components/sidenav/sidenav.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLottieModule } from '../ui-modules/lottie/lottie.module';



@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    NgxChartsModule,
    FormsModule,
    AppRoutingModule,
    AppLottieModule
  ],
  exports: [
    SidenavComponent,
    IconsModule,
    NgxChartsModule,
    FormsModule,
    AppRoutingModule,
    AppLottieModule
  ],
})
export class SharedModule { }
