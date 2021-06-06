import { SettingsRouterModule } from './settings-router.module';
import { UserPreferencesPageComponent } from './_pages/user-preferences-page/user-preferences-page.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserPreferencesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRouterModule
  ]
})
export class SettingsModule { }
