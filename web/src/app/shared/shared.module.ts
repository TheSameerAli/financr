import { SharedEffects } from './store/shared.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IconsModule } from '../ui-modules/icons/icons.module';
import { SidenavComponent } from './../shared/_components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { AppLottieModule } from '../ui-modules/lottie/lottie.module';
import { sharedReducer } from './store/shared.reducer';



@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    IconsModule,
    NgxChartsModule,
    FormsModule,
    AppLottieModule,
    RouterModule,
    StoreModule.forFeature('shared', [sharedReducer]),
    EffectsModule.forFeature([SharedEffects])
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
