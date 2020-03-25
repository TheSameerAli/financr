export interface DashboardData {
    profitLossCard: DashboardProfitLossCard;
}

export interface DashboardProfitLossCard {
    profit: number;
    income: number;
    outgoing: number;
    debt: number;
}