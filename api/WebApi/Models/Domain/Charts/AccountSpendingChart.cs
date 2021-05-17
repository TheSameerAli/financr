using System.Collections.Generic;

namespace WebApi.Models.Domain.Charts
{
    public class AccountSpendingChart
    {
        public List<AccountSpendingChartData> Data { get; set; }
    }

    public class AccountSpendingChartData
    {
        public string Name { get; set; }
        public double Value { get; set; }
    }
}