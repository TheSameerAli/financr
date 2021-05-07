import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowDownRight, ArrowUpRight, ArrowRightCircle, Home, ArrowRight, ArrowLeft } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  ArrowRightCircle,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ArrowLeft,
  Home
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [IconsModule]
})
export class IconsModule { }
