using System;
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
    [Route("account")]
    public class AccountCategoryController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IAccountCategoryService _accountCategoryService;

        public AccountCategoryController(IAccountService accountService, IAccountCategoryService accountCategoryService)
        {
            _accountService = accountService;
            _accountCategoryService = accountCategoryService;
        }
        
        [HttpPost("{accountId}/category/create")]
        public async Task<IActionResult> CreateAccountCategory([FromBody] CreateAccountCategoryRequest request, Guid accountId)
        {
            return Ok(await _accountCategoryService.CreateAccountCategory(request.Name, request.Type, accountId));
        }

        [HttpGet("{accountId}/categories")]
        public async Task<IActionResult> GetAccountCategories(Guid accountId)
        {
            return Ok(await _accountCategoryService.GetAccountCategories(accountId));
        }

        [HttpPatch("{accountId}/category/{categoryId}/edit")]
        public async Task<IActionResult> EditAccountCategory([FromBody] CreateAccountCategoryRequest request,
            Guid accountId, Guid categoryId)
        {
            return Ok(await _accountCategoryService.EditCategory(request.Name, categoryId, accountId));
        }

        [HttpDelete("{accountId}/category/{accountCategoryId}/delete")]
        public async Task<IActionResult> DeleteCategory(Guid accountId, Guid accountCategoryId)
        {
            return Ok(await _accountCategoryService.DeleteCategory(accountCategoryId));
        }
    }
}