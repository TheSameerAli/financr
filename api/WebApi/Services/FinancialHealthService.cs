using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Domain;
using Account = WebApi.Models.Database.Account.Account;

namespace WebApi.Services
{
    public interface IFinancialHealthService
    {
        Task<FinancialHealth> GetFinancialHealth(Guid userId);
    }
    public class FinancialHealthService : IFinancialHealthService
    {
        private readonly IUnitOfWork _uow;
        private DbSet<Transaction> _transactions;
        private DbSet<Account> _accounts;
        private IUserService _userService;
        private ICurrencyConversionService _currencyConversionService;
        public FinancialHealthService(IUnitOfWork uow, IUserService userService, ICurrencyConversionService currencyConversionService)
        {
            _uow = uow;
            _transactions = _uow.Set<Transaction>();
            _accounts = _uow.Set<Account>();
            _userService = userService;
            _currencyConversionService = currencyConversionService;
        }   
        public async Task<FinancialHealth> GetFinancialHealth(Guid userId)
        {
            var personalWorth = await GetAccountsWorth(userId, AccountType.Current);
            var businessWorth = await GetAccountsWorth(userId, AccountType.Investment);
            var savingsWorth = await GetAccountsWorth(userId, AccountType.Savings);
            var debts = await GetUserDebt(userId);
            return new FinancialHealth(personalWorth+businessWorth+savingsWorth+debts, 
                personalWorth, businessWorth, savingsWorth);
        }


        private async Task<double> GetAccountsWorth(Guid userId, AccountType type)
        {
            var userPreferences = await _userService.GetPreferences(userId);
            var accounts = await _accounts
                .Include(a =>a.Preferences)
                .Where(a => a.UserId == userId && a.Type == type)
                .ToListAsync();
            var transactions = new List<Transaction>();
            foreach (var account in accounts)
            {
                var accountTransactions = await _transactions.Where(t => t.AccountId == account.Id).AsNoTracking().ToListAsync();
                if (account.Preferences.Currency != userPreferences.Currency)
                {
                    var pair = $"{account.Preferences.Currency}_{userPreferences.Currency}";
                    foreach (var transaction in accountTransactions)
                    {
                        transaction.Amount = await _currencyConversionService.Convert(pair, transaction.Amount);
                    }
                    
                }
                transactions.AddRange(accountTransactions);
            }
            return transactions.Sum(transaction => transaction.Amount);
        }

        private async Task<double> GetUserDebt(Guid userId) 
        {
            var accounts = await _accounts
                    .Where(a => a.UserId == userId && a.Type == AccountType.CreditCard)
                    .Include(a => a.Transactions)
                    .ToListAsync();
            
            var transactions = new List<Transaction>();

            foreach (var account in accounts) 
            {
                transactions.AddRange(account.Transactions);
            }

            return transactions.Sum(t => t.Amount);

        }
    }
}