using System;
using WebApi.Models.Database.Base;

namespace WebApi.Models.Database
{
    public class TransactionNote : BaseModel
    {
        public string Note { get; set; }
        public Guid TransactionId { get; set; }
        public virtual Transaction Transaction { get; set; }

        public TransactionNote(string note, Guid transactionId)
        {
            Note = note;
            TransactionId = transactionId;
        }
    }
}