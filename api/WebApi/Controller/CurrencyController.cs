using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
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
        private readonly ICurrencyConversionService _currencyConversionService;
        public CurrencyController(ICurrencyConversionService currencyConversionService)
        {
            _currencyConversionService = currencyConversionService;
        }
        
        [AllowAnonymous]
        [HttpGet("list")]
        public IActionResult GetCurrencies()
        {
            return Ok(Currencies.GetCurrencies());
        }

        [AllowAnonymous]
        [HttpGet("convert")]
        public async Task<IActionResult> ConvertCurrency(string pair, double amount)
        {
            return Ok(await _currencyConversionService.Convert(pair, amount));
        }
    }
}