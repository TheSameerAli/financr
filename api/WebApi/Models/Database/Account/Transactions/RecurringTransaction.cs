using System;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.Database.Account;
using WebApi.Models.Database.Base;
using WebApi.Utilities;

namespace WebApi.Models.Database
{
    public class RecurringTransaction : BaseModel
    {
        public DateTimeOffset StartDate { get; set; }
        public int Occurrence { get; set; } // In days (1 = Every day) - (30 - Every month)
        public string Description { get; set; }
        
        public double Income { get; set; }
        
        public Guid AccountCategoryId { get; set; }
        public virtual AccountCategory AccountCategory { get; set; }
        
        public Guid AccountId { get; set; }
        public Account.Account Account { get; set; }

        [NotMapped]
        public DateTimeOffset NextDate => 
            RecurringTransactions.NextDate(StartDate, Occurrence, DateTimeOffset.Now);        
        public RecurringTransaction() {}
        public RecurringTransaction(DateTimeOffset startDate, int occurrence, double income, string description, Guid accountCategoryId, Guid accountId)
        {
            StartDate = startDate;
            Occurrence = occurrence;
            Description = description;
            AccountCategoryId = accountCategoryId;
            AccountId = accountId;
            Income = income;
        }
    }
}