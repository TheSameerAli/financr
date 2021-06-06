using System;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using WebApi.Controller.Base;
using WebApi.Models.Database;
using WebApi.Models.Domain;
using WebApi.Models.DTO.Requests;
using WebApi.Services;
using Account = WebApi.Models.Domain.Account;

namespace WebApi.Controller
{
    [ApiController]
    [Authorize]
    [Route("account")]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IAccountCategoryService _accountCategoryService;
        private readonly IUserService _userService;
        private readonly ICurrencyConversionService _currencyConversionService;

        public AccountController(IAccountService accountService, IAccountCategoryService accountCategoryService, IUserService userService,
            ICurrencyConversionService currencyConversionService)
        {
            _accountService = accountService;
            _accountCategoryService = accountCategoryService;
            _userService = userService;
            _currencyConversionService = currencyConversionService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAccounts()
        {
            return Ok(await _accountService.GetAccounts(UserId));
        }

        [HttpGet("{accountId}/spending-chart")]
        // Gets the monthly spending chart for the account
        public async Task<IActionResult> GetSpendingChart(Guid accountId)
        {
            return Ok(await _accountService.GetSpendingChart(accountId));
        }

        [HttpGet("{accountId}")]
        public async Task<IActionResult> GetAccountData(Guid accountId)
        {
            var account = await _accountService.GetAccount(accountId);
            var accountResp = new Account(account.Id, account.Name, account.Type, account.UserId, account.Transactions,
                account.Budget, account.Preferences);
            var userPreferences = await _userService.GetPreferences(UserId);
            if (account.Preferences.Currency != userPreferences.Currency)
            {
                var pair = $"{account.Preferences.Currency}_{userPreferences.Currency}";
                var totalConvertedAmount = await _currencyConversionService.Convert(pair, accountResp.AvailableBalance);
                var totalConvertedIncome = await _currencyConversionService.Convert(pair, accountResp.TotalIncome);
                var totalConvertedOutgoings = await _currencyConversionService.Convert(pair, accountResp.TotalOutgoings);

                accountResp.ConvertedBalance = totalConvertedAmount;
                accountResp.ConvertedTotalExpense = totalConvertedOutgoings;
                accountResp.ConvertedTotalIncome = totalConvertedIncome;
            }
            return Ok(accountResp);
        }

        [HttpGet("{accountId}/preferences")]
        public async Task<IActionResult> GetAccountPreferences(Guid accountId)
        {
            return Ok(await _accountService.GetAccountPreferences(accountId));
        }

        [HttpPatch("{accountId}/set-currency")]
        public async Task<IActionResult> SetAccountCurrency([FromBody] SetCurrencyRequest request, Guid accountId)
        {
            return Ok(await _accountService.ChangeCurrency(request.Currency, accountId));
        }

        [HttpPost("{accountId}/budget")]
        public async Task<IActionResult> SetAccountBudget(Guid accountId, SetAccountBudgetRequest request)
        {
            return Ok(await _accountService.SetBudget(request.Budget, accountId));
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountRequest request)
        {
            return Ok(await _accountService.Create(request.Name, request.Type, UserId, request.InitialAmount));
        }
    }
}