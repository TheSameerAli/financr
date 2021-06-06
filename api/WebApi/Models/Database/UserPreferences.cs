using System;
using System.Linq;
using WebApi.Configuration;
using WebApi.Models.Database.Base;
using WebApi.Models.Domain;

namespace WebApi.Models.Database
{
    public class UserPreferences: BaseModel
    {
        public string Currency { get; set; }
        
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        
        public virtual Currency CurrencyData =>
            Currencies.GetCurrencies().FirstOrDefault(c => c.Code == Currency);

        public UserPreferences(string currency, Guid userId)
        {
            Currency = currency;
            UserId = userId;
        }
        
        public UserPreferences()
        {
            
        }
    }
}