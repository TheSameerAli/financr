using System.Collections.Generic;

namespace WebApi.Models.Domain.Networth
{
    public class DashboardChart
    {
        public List<MonthlyAmount> Networth { get; set; }
        public List<MonthlyAmount> Spending { get; set; }
    }
}