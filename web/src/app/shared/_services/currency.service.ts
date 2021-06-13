import { Observable } from 'rxjs';
import { Currency } from './../_models/currency';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const CURRENCY_ENDPOINT = `${environment.api}/currency`;

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${CURRENCY_ENDPOINT}/list`);
  }

  convert(pair: string, amount: string) {
    return this.http.get<number>(`${CURRENCY_ENDPOINT}/convert?pair=${pair}&amount=${amount}`);
  }
}
