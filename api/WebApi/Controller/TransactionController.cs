﻿using System;
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
    public class TransactionController : BaseController
    {
        private readonly ITransactionService _transactionService;
        private readonly IRecurringTransactionsService _recurringTransactionService;
        public TransactionController(ITransactionService transactionService, IRecurringTransactionsService recurringTransactions)
        {
            _transactionService = transactionService;
            _recurringTransactionService = recurringTransactions;
        }

        [HttpGet("{accountId}/transactions")]
        public async Task<IActionResult> GetTransactions(Guid accountId, [FromQuery] DateTimeOffset dateMonth)
        {
            if (dateMonth != DateTimeOffset.MinValue)
            {
                return Ok(await _transactionService.GetAllByMonth(accountId, dateMonth));
            }
            return Ok(await _transactionService.GetAll(accountId));
        }

        [HttpGet("{accountId}/transactions/{transactionId}")]
        public async Task<IActionResult> GetTransactionById(Guid accountId, Guid transactionId)
        {
            return Ok(await _transactionService.GetTransactionById(transactionId));
        }

        [HttpGet("subscriptions")]
        public async Task<IActionResult> GetUserSubscriptions() 
        {
            return Ok(await _recurringTransactionService.GetAllSubscriptions(UserId));
        }
        

        [HttpPost("{accountId}/transaction/create")]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionRequest request, Guid accountId)
        {
            if (request.TransactionDate > DateTimeOffset.Now.AddDays(7)) // Allow transactions to be created for a week in advanced
            {
                throw new InvalidDataException("Transaction can not be in the future");
            }
            return Ok(await _transactionService.Create(request.Amount, request.Description, request.TransactionDate,
                request.AccountCategoryId, accountId));
        }

        [HttpPost("{accountId}/transaction/{transactionId}/note")]
        public async Task<IActionResult> CreateOrUpdateTransactionNote([FromBody] UpdateTransactionNoteRequest request,
            Guid accountId, Guid transactionId)
        {
            return Ok(await _transactionService.UpdateTransactionNote(request.Note, transactionId));
        }

        [HttpPut("{accountId}/transaction/{transactionId}/edit")]
        public async Task<IActionResult> EditTransaction([FromBody] EditTransactionRequest request, Guid accountId,
            Guid transactionId)
        {
            if (request.TransactionDate > DateTimeOffset.Now)
            {
                throw new InvalidCastException("Transacton can not be in the future");
            }

            return Ok(await _transactionService.Edit(request.Amount, request.Description, request.TransactionDate,
                request.AccountCategoryId, transactionId));
        }

        [HttpDelete("{accountId}/transaction/{transactionId}/delete")]
        public async Task<IActionResult> DeleteTransaction(Guid accountId, Guid transactionId)
        {
            return Ok(await _transactionService.DeleteTransaction(transactionId));
        }
        
    }
}