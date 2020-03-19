using System;
using System.IO;
using System.Linq;
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
    public class RecurringTransactionController : BaseController
    {
        private readonly IRecurringTransactionsService _recurringTransactionsService;

        public RecurringTransactionController(IRecurringTransactionsService recurringTransactionsService)
        {
            _recurringTransactionsService = recurringTransactionsService;
        }

        [HttpGet("{accountId}/recurring-transactions")]
        public async Task<IActionResult> GetAllRecurringTransactions(Guid accountId)
        {
            return Ok(await _recurringTransactionsService.GetAll(accountId));
        }

        [HttpPost("{accountId}/recurring-transaction/create")]
        public async Task<IActionResult> CreateRecurringTransaction(Guid accountId,
            [FromBody] CreateRecurringTransactionRequest request)
        {
            return Ok(await _recurringTransactionsService.Create(request.StartDate, request.Occurrence, request.Income,
                request.Description, request.AccountCategoryId, accountId));
        }

        [HttpDelete("{accountId}/recurring-transaction/{recurringTransactionId}")]
        public async Task<IActionResult> DeleteRecurringTransaction(Guid recurringTransactionId)
        {
            await _recurringTransactionsService.Delete(recurringTransactionId);
            return Ok();
        }
            
    }
}