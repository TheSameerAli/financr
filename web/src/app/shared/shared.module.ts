import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IconsModule } from '../ui-modules/icons/icons.module';
import { SidenavComponent } from './../shared/_components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
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
    AppLottieModule
  ],
  exports: [
    SidenavComponent,
    IconsModule,
    NgxChartsModule,
    FormsModule,
    AppLottieModule
  ],
})
export class SharedModule { }
