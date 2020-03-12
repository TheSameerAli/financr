using System;

namespace WebApi.Models.Domain.Networth
{
    public class NetworthMonth
    {
        public DateTime Month { get; set; }
        public double Amount { get; set; }

        public NetworthMonth(DateTime month, double amount)
        {
            Month = month;
            Amount = amount;
        }
    }
}