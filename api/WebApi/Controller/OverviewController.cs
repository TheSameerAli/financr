using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controller.Base;
using WebApi.Services;

namespace WebApi.Controller
{
    [ApiController]
    [Authorize]
    [Route("overview")]
    public class OverviewController : BaseController
    {
        private readonly IFinancialHealthService _financialHealthService;
        public OverviewController(IFinancialHealthService financialHealthService)
        {
            _financialHealthService = financialHealthService;
        }
        
        [HttpGet("financial-health")]
        public async Task<IActionResult> GetFinancialHealth()
        {
            return Ok(await _financialHealthService.GetFinancialHealth(UserId));
        }
    }
}