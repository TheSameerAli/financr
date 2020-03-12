namespace WebApi.Models.Domain
{
    public class FinancialHealth
    {
        public double TotalNetWorth { get; set; }
        public double PersonalAccountsWorth { get; set; }
        public double BusinessAccountsWorth { get; set; }
        public double SavingsAccountsWorth { get; set; }
        
        public FinancialHealth(
            double totalNetWorth, 
            double personalAccountsWorth, 
            double businessAccountsWorth,
            double savingsAccountsWorth)
        {
            TotalNetWorth = totalNetWorth;
            PersonalAccountsWorth = personalAccountsWorth;
            BusinessAccountsWorth = businessAccountsWorth;
            SavingsAccountsWorth = savingsAccountsWorth;
        }
    }
}