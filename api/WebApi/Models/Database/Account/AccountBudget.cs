using System;
using WebApi.Models.Database.Base;

namespace WebApi.Models.Database.Account
{
    public class AccountBudget : BaseModel
    {
        public double Budget { get; set; }
        public Guid AccountId { get; set; }
        public virtual Account Account { get; set; }

        public AccountBudget()
        {
            
        }

        public AccountBudget(double budget, Guid accountId)
        {
            Budget = budget;
            AccountId = accountId;
        }
    }
}