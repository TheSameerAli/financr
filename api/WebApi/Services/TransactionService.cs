using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;

namespace WebApi.Services
{
    public interface ITransactionService
    {
        Task<Transaction> Create(double income, string description, DateTimeOffset transactionDate, Guid accountCategoryId, Guid accountId);
        Task<List<Transaction>> GetAll(Guid accountId);
        Task<List<Transaction>> GetAllByDate(Guid accountId, DateTimeOffset date);
        Task<bool> DeleteTransaction(Guid transactionId);

    }
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Transaction> _trasactions;
        public TransactionService(IUnitOfWork uow)
        {
            _uow = uow;
            _trasactions = _uow.Set<Transaction>();
        }

        public async Task<Transaction> Create(double income, string description, DateTimeOffset transactionDate, Guid accountCategoryId, Guid accountId)
        {
            var transaction = new Transaction(income, description, transactionDate, accountCategoryId, accountId);
            await _trasactions.AddAsync(transaction);
            await _uow.SaveChangesAsync();
            return transaction;
        }

        public async Task<List<Transaction>> GetAll(Guid accountId)
        {
            return await _trasactions
                .Where(t => t.AccountId == accountId)
                .Include(t => t.AccountCategory)
                .OrderByDescending(t => t.TransactionDate)
                .ThenByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Transaction>> GetAllByDate(Guid accountId, DateTimeOffset date)
        {
            return await _trasactions
                .Where(t => t.AccountId == accountId && date.Month == t.TransactionDate.Month)
                .Include(t => t.AccountCategory)
                .OrderByDescending(t => t.TransactionDate)
                .ThenByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<bool> DeleteTransaction(Guid transactionId)
        {
            var transaction = await _trasactions.FirstOrDefaultAsync(t => t.Id == transactionId);
            if (transaction == null)
            {
                return false;
            }
            _trasactions.Remove(transaction);
            await _uow.SaveChangesAsync();
            return true;
        }
    }
}