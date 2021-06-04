using System;
using System.Linq;
using WebApi.Configuration;
using WebApi.Models.Database.Base;
using WebApi.Models.Domain;

namespace WebApi.Models.Database.Account
{
    public class AccountPreferences : BaseModel
    {
        public string Currency { get; set; }

        public virtual Currency CurrencyData =>
            Currencies.GetCurrencies().FirstOrDefault(c => c.Code == Currency);
        
        public Guid AccountId { get; set; }
        public virtual Account Account { get; set; }

        public AccountPreferences(string currency, Guid accountId)
        {
            Currency = currency;
            AccountId = accountId;
        }
    }
}