using System;
using WebApi.Models.Database.Account;
using WebApi.Models.Database.Base;

namespace WebApi.Models.Database
{
    public class Transaction : BaseModel
    {
        public double Income { get; set; }
        public string Description { get; set; }
        public Guid AccountId { get; set; }
        public DateTimeOffset TransactionDate { get; set; }
        public Guid AccountCategoryId { get; set; }
        public virtual AccountCategory AccountCategory { get; set; }
        public virtual Account.Account Account { get; set; }
        

        public Transaction(double income, string description, DateTimeOffset transactionDate, Guid accountCategoryId, Guid accountId)
        {
            Income = income;
            Description = description;
            AccountId = accountId;
            TransactionDate = transactionDate;
            AccountCategoryId = accountCategoryId;
        }
    }
}