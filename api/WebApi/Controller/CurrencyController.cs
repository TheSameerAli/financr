using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using WebApi.Configuration;
using WebApi.Models.DTO.Requests;
using WebApi.Services;

namespace WebApi.Controller
{
    [ApiController]
    [Route("currency")]
    public class CurrencyController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("list")]
        public IActionResult GetCurrencies()
        {
            return Ok(Currencies.GetCurrencies());
        }
    }
}