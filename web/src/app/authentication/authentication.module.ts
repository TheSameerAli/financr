import { AuthenticationRoutingModule } from './authentication-router.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './_pages/login-page/login-page.component';
import { LogoutPageComponent } from './_pages/logout-page/logout-page.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [LoginPageComponent, LogoutPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthenticationModule { }
