using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Models.Database.Base;
using WebApi.Models.Domain;

namespace WebApi.Models.Database.Account
{
    public class Account : BaseModel
    {
        public string Name { get; set; }
        public AccountType Type { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }

        public double Balance => Transactions?.Sum(t => t.Amount) ?? 0;
        
        public virtual List<Transaction> Transactions { get; set; }
        public virtual List<AccountCategory> Categories { get; set; }
        
        public virtual AccountBudget Budget { get; set; }
        
        public virtual AccountPreferences Preferences { get; set; }

        public Account(string name, AccountType type, Guid userId)
        {
            Name = name;
            Type = type;
            UserId = userId;
        }

    }
}