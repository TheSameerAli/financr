import { UserPreferences } from './../settings/_models/user-preferences';
import { FinancialHealth } from './_models/financial-health';
export interface SharedState {
  financialHealthState: FinancialHealthState,
  userPreferences: UserPreferences
}

export interface FinancialHealthState {
  financialHealth: FinancialHealth,
  isLoading: boolean;
}

export const initialState: SharedState = {
  financialHealthState: {
    financialHealth: {
      totalNetWorth: 0,
      personalAccountsWorth: 0,
      businessAccountsWorth: 0,
      savingsAccountsWorth: 0,
    },
    isLoading: false,
  },
  userPreferences: {} as UserPreferences

}
