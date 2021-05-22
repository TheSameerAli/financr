using System;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using WebApi.Controller.Base;
using WebApi.Models.Database;
using WebApi.Models.DTO.Requests;
using WebApi.Services;

namespace WebApi.Controller
{
    [ApiController]
    [Authorize]
    [Route("reports")]
    public class ReportsController : BaseController
    {
        private readonly IReportService _reportService;
        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;

        }


        [HttpGet("general-report")]
        public async Task<IActionResult> GetGeneralReportForAllAccounts(DateTimeOffset startDate, DateTimeOffset endDate)
        {
            return Ok(await _reportService.GetAllAccountReport(startDate, endDate, UserId));
        }

        [HttpGet("general-report/{accountId}")]
        public async Task<IActionResult> GetGeneralReportForOneAccount(DateTimeOffset startDate, DateTimeOffset endDate, Guid accountId)
        {
            return Ok(await _reportService.GetAccountReport(startDate, endDate, accountId, UserId));
        }
        
    }
}