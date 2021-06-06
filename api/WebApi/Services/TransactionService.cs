using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Utilities;

namespace WebApi.Services
{
    public interface ITransactionService
    {
        Task<Transaction> Create(double income, string description, DateTimeOffset transactionDate, Guid accountCategoryId, Guid accountId);
        Task<List<Transaction>> GetAll(Guid accountId);
        Task<Transaction> GetTransactionById(Guid transactionId);
        Task<List<Transaction>> GetAllByDate(Guid accountId, DateTimeOffset date);

        Task<Transaction> Edit(double income, string description, DateTimeOffset transactionDate,
            Guid accountCategoryId, Guid transactionId);
        Task<bool> DeleteTransaction(Guid transactionId);
        Task RunRecurringTransactions();

    }
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Transaction> _transactions;
        private readonly DbSet<RecurringTransactionsLog> _recurringTransactionsLogs;
        private readonly IRecurringTransactionsService _recurringTransactionsService;
        private readonly DbSet<Account> _accounts;
        private readonly IUserService _userService;
        private readonly ICurrencyConversionService _currencyConversionService;
        
        
        public TransactionService(IUnitOfWork uow, IRecurringTransactionsService recurringTransactionsService,
            IUserService userService, ICurrencyConversionService currencyConversionService)
        {
            _uow = uow;
            _transactions = _uow.Set<Transaction>();
            _recurringTransactionsService = recurringTransactionsService;
            _recurringTransactionsLogs = _uow.Set<RecurringTransactionsLog>();
            _accounts = _uow.Set<Account>();
            _userService = userService;
            _currencyConversionService = currencyConversionService;
        }

        public async Task<Transaction> Create(double income, string description, DateTimeOffset transactionDate, Guid accountCategoryId, Guid accountId)
        {
            var transaction = new Transaction(income, description, transactionDate, accountCategoryId, accountId);
            await _transactions.AddAsync(transaction);
            await _uow.SaveChangesAsync();
            return transaction;
        }

        public async Task<List<Transaction>> GetAll(Guid accountId)
        {
            var transactions = await _transactions
                .Where(t => t.AccountId == accountId)
                .Include(t => t.AccountCategory)
                .OrderByDescending(t => t.TransactionDate)
                .ThenByDescending(t => t.CreatedAt)
                .ToListAsync();
            var account = await _accounts.Include(a => a.Preferences)
                .Where(a => a.Id == accountId).FirstOrDefaultAsync();
            var userPreferences = await _userService.GetPreferences(account.UserId);
            var accountPreferences = account.Preferences;
            foreach (var transaction in transactions)
            {
                if (userPreferences.Currency != accountPreferences.Currency)
                {
                    transaction.ConvertedAmount =
                        await _currencyConversionService.Convert(
                            $"{accountPreferences.Currency}_{userPreferences.Currency}", transaction.Amount);
                }
            }

            return transactions;
        }

        public async Task<Transaction> GetTransactionById(Guid transactionId)
        {
            return await _transactions
                .Where(t => t.Id == transactionId)
                .Include(t => t.AccountCategory)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Transaction>> GetAllByDate(Guid accountId, DateTimeOffset date)
        {
            return await _transactions
                .Where(t => t.AccountId == accountId && date.Month == t.TransactionDate.Month)
                .Include(t => t.AccountCategory)
                .OrderByDescending(t => t.TransactionDate)
                .ThenByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<Transaction> Edit(double income, string description, DateTimeOffset transactionDate, Guid accountCategoryId,
            Guid transactionId)
        {
            var transaction = await _transactions.FirstOrDefaultAsync(t => t.Id == transactionId);
            transaction.Amount = income;
            transaction.Description = description;
            transaction.AccountCategoryId = accountCategoryId;
            transaction.TransactionDate = transactionDate;
            await _uow.SaveChangesAsync();
            return transaction;
        }

        public async Task<bool> DeleteTransaction(Guid transactionId)
        {
            var transaction = await _transactions.FirstOrDefaultAsync(t => t.Id == transactionId);
            if (transaction == null)
            {
                return false;
            }
            _transactions.Remove(transaction);
            await _uow.SaveChangesAsync();
            return true;
        }

        public async Task RunRecurringTransactions()
        {
            var recurringTransactions = await _recurringTransactionsService.GetAll();
            var totalAdded = 0;
            foreach (var recurringTransaction in recurringTransactions)
            {
                var nextDate = RecurringTransactions.NextDate(recurringTransaction.StartDate,
                    recurringTransaction.Occurrence, DateTimeOffset.Now);
                if (nextDate.Date == DateTime.Now.Date)
                {
                    // Create the transaction
                    var transaction = new Transaction(
                        recurringTransaction.Income, 
                        recurringTransaction.Description, 
                        DateTimeOffset.Now, 
                        recurringTransaction.AccountCategoryId, 
                        recurringTransaction.AccountId);

                    await _transactions.AddAsync(transaction);
                    await _uow.SaveChangesAsync();
                    totalAdded++;
                }
                // otherwise do nothing
            }
            var recurringTransactionLog = new RecurringTransactionsLog(totalAdded);
            await _recurringTransactionsLogs.AddAsync(recurringTransactionLog);
            await _uow.SaveChangesAsync();
        }
    }
}