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

        [HttpGet("dashboard-data")]
        public async Task<IActionResult> GetDashboardData()
        {
            return Ok(await _dashboardService.GetDashboardData(UserId));
        }
    }
}