using System;
using WebApi.Models.Database.Base;

namespace WebApi.Models.Database
{
    public class UserPreferences: BaseModel
    {
        public string Currency { get; set; }
        
        public Guid UserId { get; set; }
        public virtual User User { get; set; }

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