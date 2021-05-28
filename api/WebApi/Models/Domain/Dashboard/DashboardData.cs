namespace WebApi.Models.Domain.Dashboard
{
    public class DashboardData
    {
        public FigureCard Income { get; set; }
        public FigureCard Expenses { get; set; }
        public FigureCard Savings { get; set; }
        
        public FigureCard Investments { get; set; }
        
        public DashboardData(FigureCard income, FigureCard expenses, FigureCard savings, FigureCard investments)
        {
            Income = income;
            Expenses = expenses;
            Savings = savings;
            Investments = investments;
        }
    }

    public class FigureCard
    {
        public double Value { get; set; }
        public double PercentageChange { get; set; }

        public FigureCard(double value, double percentageChange)
        {
            Value = value;
            PercentageChange = percentageChange;
        }
    }
}