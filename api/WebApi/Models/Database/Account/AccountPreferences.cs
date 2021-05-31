using System;
using WebApi.Models.Database.Base;

namespace WebApi.Models.Database.Account
{
    public class AccountPreferences : BaseModel
    {
        public string Currency { get; set; }
        
        public Guid AccountId { get; set; }
        public virtual Account Account { get; set; }

        public AccountPreferences(string currency, Guid accountId)
        {
            Currency = currency;
            AccountId = accountId;
        }
    }
}