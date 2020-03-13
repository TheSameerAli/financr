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

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet("{accountId}/transactions")]
        public async Task<IActionResult> GetTransactions(Guid accountId, [FromQuery] DateTimeOffset dateMonth)
        {
            if (dateMonth != DateTimeOffset.MinValue)
            {
                return Ok(await _transactionService.GetAllByDate(accountId, dateMonth));
            }
            return Ok(await _transactionService.GetAll(accountId));
        }
        

        [HttpPost("{accountId}/transaction/create")]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionRequest request, Guid accountId)
        {
            if (request.TransactionDate > DateTimeOffset.Now)
            {
                throw new InvalidDataException("Transaction can not be in the future");
            }
            return Ok(await _transactionService.Create(request.Income, request.Description, request.TransactionDate,
                request.AccountCategoryId, accountId));
        }

        [HttpDelete("{accountId}/transaction/{transactionId}/delete")]
        public async Task<IActionResult> DeleteTransaction(Guid accountId, Guid transactionId)
        {
            return Ok(await _transactionService.DeleteTransaction(transactionId));
        }
        
    }
}