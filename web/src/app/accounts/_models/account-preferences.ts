import { Currency } from './currency';
export interface AccountPreferences {
  currency: string;
  currencyData: Currency;
  accountId: string;
}
