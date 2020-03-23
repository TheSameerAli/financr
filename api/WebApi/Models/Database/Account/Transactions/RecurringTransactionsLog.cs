using WebApi.Models.Database.Base;

namespace WebApi.Models.Database
{
    public class RecurringTransactionsLog : BaseModel
    {
        public int NewTransactionsAdded { get; set; }
        
        public RecurringTransactionsLog() {}

        public RecurringTransactionsLog(int newTransactionsAdded)
        {
            NewTransactionsAdded = newTransactionsAdded;
        }
    }
}