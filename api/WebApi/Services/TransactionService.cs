using System;
using System.Collections.Generic;
using System.IO;
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
        Task<List<Transaction>> GetAllByMonth(Guid accountId, DateTimeOffset date);

        Task<Transaction> Edit(double income, string description, DateTimeOffset transactionDate,
            Guid accountCategoryId, Guid transactionId);

        Task<TransactionNote> UpdateTransactionNote(string note, Guid transactionId);
        Task<bool> DeleteTransaction(Guid transactionId);

    }
    public class TransactionService : ITransactionService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Transaction> _transactions;
        private readonly DbSet<AccountCategory> _accountCategories;
        private readonly DbSet<TransactionNote> _transactionNotes;
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
            _accountCategories = _uow.Set<AccountCategory>();
            _transactionNotes = _uow.Set<TransactionNote>();
            _recurringTransactionsService = recurringTransactionsService;
            _recurringTransactionsLogs = _uow.Set<RecurringTransactionsLog>();
            _accounts = _uow.Set<Account>();
            _userService = userService;
            _currencyConversionService = currencyConversionService;
        }

        public async Task<Transaction> Create(double income, string description, DateTimeOffset transactionDate, Guid accountCategoryId, Guid accountId)
        {
            if (income == 0)
            {
                throw new InvalidDataException("Transaction amount can not be 0");
            }

            var accountCategory = await _accountCategories.FirstOrDefaultAsync(ac => ac.Id == accountCategoryId);
            if ((accountCategory.Type == AccountCategoryType.Expense && income > 0) || (accountCategory.Type == AccountCategoryType.Income && income < 0))
            {
                income *= -1;
            }
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
            if (account == null)
            {
                return new List<Transaction>();
            }
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
                .Include(t => t.TransactionNote)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Transaction>> GetAllByMonth(Guid accountId, DateTimeOffset date)
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
            if (income == 0)
            {
                throw new InvalidDataException("Transaction amount can not be 0");
            }

            var accountCategory = await _accountCategories.FirstOrDefaultAsync(ac => ac.Id == accountCategoryId);
            if ((accountCategory.Type == AccountCategoryType.Expense && income > 0) || (accountCategory.Type == AccountCategoryType.Income && income < 0))
            {
                income *= -1;
            }
            var transaction = await _transactions.FirstOrDefaultAsync(t => t.Id == transactionId);
            transaction.Amount = income;
            transaction.Description = description;
            transaction.AccountCategoryId = accountCategoryId;
            transaction.TransactionDate = transactionDate;
            await _uow.SaveChangesAsync();
            return transaction;
        }

        public async Task<TransactionNote> UpdateTransactionNote(string note, Guid transactionId)
        {
            var transactionNote = await _transactionNotes.FirstOrDefaultAsync(tn => tn.TransactionId == transactionId);
            if (transactionNote == null)
            {
                transactionNote = new TransactionNote(note, transactionId);
                await _transactionNotes.AddAsync(transactionNote);
                await _uow.SaveChangesAsync();
                return transactionNote;
            }

            transactionNote.Note = note;
            await _uow.SaveChangesAsync();
            return transactionNote;
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

        
    }
}