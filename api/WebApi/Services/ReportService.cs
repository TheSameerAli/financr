using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain.Reports;

namespace WebApi.Services
{
    public interface IReportService
    {
        Task<GeneralReport> GetAccountReport(DateTimeOffset startDate, DateTimeOffset endDate, Guid accountId, Guid userId);
        Task<GeneralReport> GetAllAccountReport(DateTimeOffset startDate, DateTimeOffset endDate, Guid userId);
    }
    public class ReportService : IReportService
    {
        private readonly DbSet<Account> _accounts;
        private readonly DbSet<Transaction> _transactions;
        private readonly IUserService _userService;
        private readonly ICurrencyConversionService _currencyConversionService;
        private readonly IUnitOfWork _uow;

        public ReportService(IUnitOfWork uow, IUserService userService, ICurrencyConversionService currencyConversionService)
        {
            _uow = uow;
            _accounts = _uow.Set<Account>();
            _transactions = _uow.Set<Transaction>();
            _userService = userService;
            _currencyConversionService = currencyConversionService;
        }
        
        public async Task<GeneralReport> GetAccountReport(DateTimeOffset startDate, DateTimeOffset endDate, Guid accountId, Guid userId)
        {
            var account = await _accounts.Include(a => a.Preferences).Where(a => a.Id == accountId)
                .FirstOrDefaultAsync();
            var userPreferences = await _userService.GetPreferences(userId);
            var transactions = await _transactions
                .Where(t => t.AccountId == accountId)
                .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= endDate)
                .Include(t => t.AccountCategory)
                .AsNoTracking()
                .ToListAsync();

            if (account.Preferences.Currency != userPreferences.Currency)
            {
                var pair = $"{account.Preferences.Currency}_{userPreferences.Currency}";
                foreach (var transaction in transactions)
                {
                    transaction.Amount = await _currencyConversionService.Convert(pair, transaction.Amount);
                }
            }
            
            var summary = new GeneralReportSummary(transactions.Where(t => t.Amount > 0).Sum(t => t.Amount), 
                transactions.Where(t => t.Amount < 0).Sum(t => t.Amount));

            var incomeTransactions = new List<GeneralReportTransaction>();
            var expenseTransactions = new List<GeneralReportTransaction>();

            foreach (var transaction in transactions)
            {
                var amount = transaction.Amount;
                var categoryName = transaction.AccountCategory.Name;
                if (amount > 0)
                {
                    incomeTransactions.Add(new GeneralReportTransaction(categoryName, amount));
                }

                if (amount < 0)
                {
                    expenseTransactions.Add(new GeneralReportTransaction(categoryName, amount));
                }
            }
            var groupedIncomeTransactions = incomeTransactions.GroupBy(it => it.CategoryName).ToList();
            var groupedExpenseTransactions = expenseTransactions.GroupBy(et => et.CategoryName).ToList();
            
            
            return new GeneralReport(summary, groupedIncomeTransactions, groupedExpenseTransactions);
        }

        public async Task<GeneralReport> GetAllAccountReport(DateTimeOffset startDate, DateTimeOffset endDate, Guid userId)
        {
            var transactions = new List<Transaction>();
            var accounts = await _accounts.Include(a => a.Preferences).Where(a => a.UserId == userId).ToListAsync();
            
            var userPreferences = await _userService.GetPreferences(userId);

            foreach (var account in accounts)
            {
                var tr  = await _transactions
                    .Where(t => t.AccountId == account.Id)
                    .Where(t => t.TransactionDate >= startDate && t.TransactionDate <= endDate)
                    .Include(t => t.AccountCategory)
                    .AsNoTracking()
                    .ToListAsync();
                
                if (account.Preferences.Currency != userPreferences.Currency)
                {
                    var pair = $"{account.Preferences.Currency}_{userPreferences.Currency}";
                    foreach (var transaction in tr)
                    {
                        transaction.Amount = await _currencyConversionService.Convert(pair, transaction.Amount);
                    }
                }
                
                transactions.AddRange(tr);
            }
            
            var summary = new GeneralReportSummary(transactions.Where(t => t.Amount > 0).Sum(t => t.Amount), 
                transactions.Where(t => t.Amount < 0).Sum(t => t.Amount));

            var incomeTransactions = new List<GeneralReportTransaction>();
            var expenseTransactions = new List<GeneralReportTransaction>();

            foreach (var transaction in transactions)
            {
                var amount = transaction.Amount;
                var categoryName = transaction.AccountCategory.Name;
                if (amount > 0)
                {
                    incomeTransactions.Add(new GeneralReportTransaction(categoryName, amount));
                }

                if (amount < 0)
                {
                    expenseTransactions.Add(new GeneralReportTransaction(categoryName, amount));
                }
            }

            var groupedIncomeTransactions = incomeTransactions.GroupBy(it => it.CategoryName).ToList();
            var groupedExpenseTransactions = expenseTransactions.GroupBy(et => et.CategoryName).ToList();
            return new GeneralReport(summary, groupedIncomeTransactions, groupedExpenseTransactions);
        }
    }
}