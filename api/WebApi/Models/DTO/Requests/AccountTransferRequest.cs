using System;

namespace WebApi.Models.DTO.Requests
{
    public class AccountTransferRequest
    {
        public Guid ToAccountId { get; set; }
        public double Amount { get; set; }
    }
}