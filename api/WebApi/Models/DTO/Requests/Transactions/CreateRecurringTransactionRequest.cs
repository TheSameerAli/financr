using System;

namespace WebApi.Models.DTO.Requests
{
    public class CreateRecurringTransactionRequest
    {
        public DateTimeOffset StartDate { get; set; }
        public int Occurrence { get; set; }
        public double Income { get; set; }
        public string Description { get; set; }
        public Guid AccountCategoryId { get; set; }
    }
}