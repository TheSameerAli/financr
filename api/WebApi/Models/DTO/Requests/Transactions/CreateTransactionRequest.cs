using System;
using WebApi.Models.Database;

namespace WebApi.Models.DTO.Requests
{
    public class CreateTransactionRequest
    {
        public double Amount { get; set; }
        public string Description { get; set; }
        public Guid AccountCategoryId { get; set; }
        public DateTimeOffset TransactionDate { get; set; }
    }
}