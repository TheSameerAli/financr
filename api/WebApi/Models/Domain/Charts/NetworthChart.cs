using System.Collections.Generic;

namespace WebApi.Models.Domain.Charts
{
    public class NetworthChart
    {
        public string Timeframe { get; set; }
        public List<NetworthChartData> ChartData { get; set; }
    }

    public class NetworthChartData
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}