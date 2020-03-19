using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;

namespace WebApi.Services
{
    public interface IRecurringTransactionsService
    {
        Task<List<RecurringTransaction>> GetAll();
        Task<List<RecurringTransaction>> GetAll(Guid accountId);
        Task<RecurringTransaction> Create(DateTimeOffset startDate, int occurrence, 
            double income, string description, Guid accountCategoryId, Guid accountId);

        Task Delete(Guid recurringTransactionId);
    }
    public class RecurringTransactionsService : IRecurringTransactionsService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<RecurringTransaction> _recurringTransactions;
        public RecurringTransactionsService(IUnitOfWork uow)
        {
            _uow = uow;
            _recurringTransactions = _uow.Set<RecurringTransaction>();
        }
        public async Task<List<RecurringTransaction>> GetAll()
        {
            return await _recurringTransactions.ToListAsync();
        }

        public async Task<List<RecurringTransaction>> GetAll(Guid accountId)
        {
            return await _recurringTransactions
                .Where(rt => rt.AccountId == accountId)
                .Include(rt => rt.AccountCategory)
                .ToListAsync();
        }

        public async Task<RecurringTransaction> Create(DateTimeOffset startDate, int occurrence, double income, string description, Guid accountCategoryId,
            Guid accountId)
        {
            if (occurrence < 1)
            {
                throw new InvalidDataException("Occurrence should be more than 0");
            }
            var recurringTransaction = new RecurringTransaction(startDate, occurrence, income, description, accountCategoryId, accountId);
            await _recurringTransactions.AddAsync(recurringTransaction);
            await _uow.SaveChangesAsync().ConfigureAwait(false);
            return recurringTransaction;
        }

        public async Task Delete(Guid recurringTransactionId)
        {
            var recurringTransaction =
                await _recurringTransactions.FirstOrDefaultAsync(rt => rt.Id == recurringTransactionId);
            _recurringTransactions.Remove(recurringTransaction);
            await _uow.SaveChangesAsync();
        }
    }
}