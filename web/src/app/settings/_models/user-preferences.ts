import { Currency } from './../../shared/_models/currency';
export interface UserPreferences {
  currency: string;
  userId: string;
  currencyData: Currency;
}
