export interface DashboardData {
  income: FigureCard;
  expenses: FigureCard;
  savings: FigureCard;
  investments: FigureCard;
}

export interface FigureCard {
  value: number;
  percentageChange: number;
}
