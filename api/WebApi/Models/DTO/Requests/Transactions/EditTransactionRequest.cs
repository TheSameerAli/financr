using System;

namespace WebApi.Models.DTO.Requests
{
    public class EditTransactionRequest
    {
        public double Amount { get; set; }
        public string Description { get; set; }
        public Guid AccountCategoryId { get; set; }
        public DateTimeOffset TransactionDate { get; set; }
    }
}