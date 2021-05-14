import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [LottieModule]
})
export class AppLottieModule { }
