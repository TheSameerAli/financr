namespace WebApi.Models.Domain.Dashboard
{
    public class DashboardData
    {
        public DashboardProfitLossCard ProfitLossCard { get; set; }

        public DashboardData(DashboardProfitLossCard profitLossCard)
        {
            ProfitLossCard = profitLossCard;
        }
    }

    public class DashboardProfitLossCard
    {
        public DashboardProfitLossCard(double profit, double income, double outgoing, double debt)
        {
            Profit = profit;
            Income = income;
            Outgoing = outgoing;
            Debt = debt;
        }

        public double Profit { get; set; }
        public double Income { get; set; }
        public double Outgoing { get; set; }
        public double Debt { get; set; }
    }
}