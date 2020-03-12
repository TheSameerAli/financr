using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controller.Base;
using WebApi.Services;

namespace WebApi.Controller
{
    [ApiController]
    [Authorize]
    [Route("dashboard")]
    public class DashboardController : BaseController
    {
        private readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }
        
        [HttpGet("networth-chart")]
        public async Task<IActionResult> GetNetworthChart()
        {
            return Ok(await _dashboardService.GetNetworthByMonth(UserId));
        }
    }
}