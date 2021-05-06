using System.Threading.Tasks;
using WebApi.Models.Domain.Charts;

namespace WebApi.Services
{
    public interface IChartingService
    {
        Task<NetworthChart> GetNetworthChart();
    }
    public class ChartingService : IChartingService
    {
        public Task<NetworthChart> GetNetworthChart()
        {
            // Construct the chart for 1 hour
            
            // Construct the chart of 24 hours
            
            // Construct the chart for 1 week
            
            // Construct the chart of 1 year
            
            // Construct the chart for all times
            throw new System.NotImplementedException();
        }
    }
}