using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controller.Base;
using WebApi.Services;

namespace WebApi.Controller
{
    [ApiController]
    [Authorize]
    [Route("charts")]
    public class ChartsController : BaseController
    {
        private readonly IChartingService _chartingService;
        public ChartsController(IChartingService chartingService)
        {
            _chartingService = chartingService;
        }

        [HttpGet("networth")]
        public async Task<IActionResult> GetNetworthChart()
        {
            return Ok(await _chartingService.GetNetworthChart(UserId));
        }
    }
}