export interface DashboardData {
  income: FigureCard;
  expenses: FigureCard;
  savings: FigureCard;
}

export interface FigureCard {
  value: number;
  percentageChange: number;
}
