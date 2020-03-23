import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'kFormatter'
})
export class KFormatterPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {

  }
  transform(value: number, ...args: any[]): any {
    return this.kFormatter(value);
  }

  kFormatter(num: number) {
    if (num >= 1000) {
      return '£ ' + (Math.sign(num) * (Math.round(Math.abs(num) / 1000 * 10) / 10)) + 'K';
    } else {
      return this.currencyPipe.transform(num, 'GBP');
    }
}

}
