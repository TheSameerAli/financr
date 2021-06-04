import { SharedEffects } from './store/shared.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IconsModule } from '../ui-modules/icons/icons.module';
import { SidenavComponent } from './../shared/_components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { AppLottieModule } from '../ui-modules/lottie/lottie.module';
import { sharedReducer } from './store/shared.reducer';
import { DefaultLoaderComponent } from './_components/layouts/loaders/default-loader/default-loader.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    SidenavComponent,
    DefaultLoaderComponent,
  ],
  imports: [
    IconsModule,
    NgxChartsModule,
    FormsModule,
    AppLottieModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('shared', [sharedReducer]),
    EffectsModule.forFeature([SharedEffects]),
    ToastrModule.forRoot()

  ],
  exports: [
    SidenavComponent,
    IconsModule,
    NgxChartsModule,
    FormsModule,
    AppLottieModule,
    ReactiveFormsModule,
    DefaultLoaderComponent,
    ToastrModule
  ],
})
export class SharedModule { }
