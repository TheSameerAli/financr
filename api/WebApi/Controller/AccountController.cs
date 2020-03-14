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

        public AccountController(IAccountService accountService, IAccountCategoryService accountCategoryService)
        {
            _accountService = accountService;
            _accountCategoryService = accountCategoryService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAccounts()
        {
            return Ok(await _accountService.GetAccounts(UserId));
        }

        [HttpGet("{accountId}")]
        public async Task<IActionResult> GetAccountData(Guid accountId)
        {
            var account = await _accountService.GetAccount(accountId);
            return Ok(new Account(account.Id, account.Name, account.Type, account.UserId, account.Transactions, account.Budget));
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