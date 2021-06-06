import { Currency } from './../../shared/_models/currency';
export interface AccountPreferences {
  currency: string;
  currencyData: Currency;
  accountId: string;
}
