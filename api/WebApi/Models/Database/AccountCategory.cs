using System;
using WebApi.Models.Database.Base;

namespace WebApi.Models.Database
{
    public class AccountCategory : BaseModel
    {
        public string Name { get; set; }
        public Guid AccountId { get; set; }
        public AccountCategoryType Type { get; set; }
        public virtual Account Account { get; set; }

        public AccountCategory(string name, AccountCategoryType type, Guid accountId)
        {
            Name = name;
            AccountId = accountId;
            Type = type;
        }
    }

    public enum AccountCategoryType
    {
        Income = 0,
        Expense = 1
    }
}