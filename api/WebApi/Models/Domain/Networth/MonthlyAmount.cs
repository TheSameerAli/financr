using System;

namespace WebApi.Models.Domain.Networth
{
    public class MonthlyAmount
    {
        public DateTime Month { get; set; }
        public double Amount { get; set; }

        public MonthlyAmount(DateTime month, double amount)
        {
            Month = month;
            Amount = amount;
        }
    }
}