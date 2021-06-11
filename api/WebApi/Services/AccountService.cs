using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using WebApi.Configuration;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using WebApi.Models.Domain.Charts;
using Account = WebApi.Models.Database.Account.Account;
using Transaction = WebApi.Models.Database.Transaction;

namespace WebApi.Services
{
    public interface IAccountService
    {
        Task<Account> Create(string name, AccountType type, Guid userId, double initialBalance);
        Task<List<Account>> GetAccounts(Guid userId);
        Task<Account> GetAccount(Guid accountId, Guid userId);
        Task<AccountBudget> SetBudget(double budget, Guid accountId);
        Task<AccountPreferences> ChangeCurrency(string currencyCode, Guid accountId);
        Task<AccountPreferences> GetAccountPreferences(Guid accountId);
        Task<AccountSpendingChart> GetSpendingChart(Guid accountId);


    }
    public class AccountService : IAccountService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Account> _accounts;
        private readonly DbSet<Transaction> _transactions;
        private readonly DbSet<AccountCategory> _accountCategories;
        private readonly DbSet<AccountBudget> _accountBudgets;
        private readonly DbSet<AccountPreferences> _accountPreferences;
        private readonly IAccountCategoryService _accountCategoryService;
        private readonly DbSet<UserPreferences> _userPreferences;
        private readonly IUserService _userService;
        private readonly ICurrencyConversionService _currencyConversionService;
        public AccountService(
            IUnitOfWork uow, 
            IAccountCategoryService accountCategoryService, 
            IUserService userService, 
            ICurrencyConversionService currencyConversionService)
        {
            _uow = uow;
            _accounts = _uow.Set<Account>();
            _transactions = _uow.Set<Transaction>();
            _accountBudgets = _uow.Set<AccountBudget>();
            _accountCategoryService = accountCategoryService;
            _accountCategories = _uow.Set<AccountCategory>();
            _accountPreferences = _uow.Set<AccountPreferences>();
            _userPreferences = _uow.Set<UserPreferences>();
            _userService = userService;
            _currencyConversionService = currencyConversionService;
        }
        public async Task<Account> Create(string name, AccountType type, Guid userId, double initialBalance)
        {
            if (name == string.Empty)
            {
                return null;
            }
            var account = new Account(name, type, userId);
            await _accounts.AddAsync(account);
            await _uow.SaveChangesAsync();
            var userPreferences = await _userPreferences.Where(up => up.UserId == userId).FirstOrDefaultAsync();
            var preferences = new AccountPreferences(userPreferences.Currency, account.Id);
            await _accountPreferences.AddAsync(preferences);
            await _uow.SaveChangesAsync();
            await AddDefaultCategories(account.Id);

            if (initialBalance == 0 || initialBalance <= 0) return account;
            var category =
                await _accountCategories.FirstOrDefaultAsync(
                    ac => ac.Name == "Carry Over" && ac.AccountId == account.Id);
            var transaction = new Transaction(initialBalance, "Initial balance", DateTimeOffset.Now, 
                category.Id, account.Id);
            await _transactions.AddAsync(transaction);
            await _uow.SaveChangesAsync();

            account = await _accounts
                .Include(a => a.Preferences)
                .Include(a => a.Transactions).FirstOrDefaultAsync(a => a.Id == account.Id);
            return account;
        }

        public async Task<List<Account>> GetAccounts(Guid userId)
        {
            var userPreferences = await _userService.GetPreferences(userId);
            var accounts =  await _accounts
                .Where(a => a.UserId == userId)
                .Include(a => a.Budget)
                .Include(t => t.Transactions)
                .Include(t => t.Preferences)
                .ToListAsync();
            foreach (var account in accounts)
            {
                if (account.Preferences.Currency != userPreferences.Currency)
                {
                    account.ConvertedBalance =
                        await _currencyConversionService.Convert(
                            $"{account.Preferences.Currency}_{userPreferences.Currency}", account.Balance);
                }
            }

            return accounts;
        }

        public async Task<Account> GetAccount(Guid accountId, Guid userId)
        {
            var userPreferences = await _userService.GetPreferences(userId);
            var account = await _accounts
                .Include(a => a.Transactions)
                .Include(ac => ac.Budget)
                .Include(ac => ac.Preferences)
                .FirstOrDefaultAsync(a => a.Id == accountId);
            
            if (account.Preferences.Currency != userPreferences.Currency)
            {
                account.ConvertedBalance =
                    await _currencyConversionService.Convert(
                        $"{account.Preferences.Currency}_{userPreferences.Currency}", account.Balance);
            }

            return account;
        }
        

        public async Task<AccountBudget> SetBudget(double budget, Guid accountId)
        {
            var accountBudget = await 
                _accountBudgets.FirstOrDefaultAsync(ab => ab.AccountId == accountId);
            if (accountBudget == null)
            {
                accountBudget = new AccountBudget(budget, accountId);
                await _accountBudgets.AddAsync(accountBudget);
                await _uow.SaveChangesAsync();
                return accountBudget;
            }

            accountBudget.Budget = budget;
            await _uow.SaveChangesAsync();
            return accountBudget;
        }

        public async Task<AccountPreferences> ChangeCurrency(string currency, Guid accountId)
        {
            if (!Currencies.IsValid(currency))
            {
                throw new InvalidDataException("Invalid currency provided. Either the currency does not exist or is not supported by the system");
            } 
            var preferences = await _accountPreferences.Where(ap => ap.AccountId == accountId).FirstOrDefaultAsync();
            preferences.Currency = currency;
            await _uow.SaveChangesAsync();
            return preferences;
        }

        public async Task<AccountPreferences> GetAccountPreferences(Guid accountId)
        {
            return await _accountPreferences.FirstOrDefaultAsync(a => a.AccountId == accountId);
        }

        public async Task<AccountSpendingChart> GetSpendingChart(Guid accountId)
        {
            // Get the since date
            var date = DateTimeOffset.Now.AddMonths(-1);
            // Get expense transactions since that date
            var expenseTransactions = await _transactions
                .Where(t => t.AccountId == accountId)
                .Where(t => t.Amount < 0)
                .Where(t => t.TransactionDate >= date)
                .ToListAsync();
            // Group the transactions by category
            var tr = expenseTransactions.GroupBy(t => t.AccountCategoryId).ToList();
            var spendingChart = new AccountSpendingChart() {Data = new List<AccountSpendingChartData>()};
            var account = await _accounts.Where(a => a.Id == accountId)
                .Include(a => a.Preferences)
                .FirstOrDefaultAsync();
            var userPreferences = await _userService.GetPreferences(account.UserId); 

            foreach (var t in tr)
            {
                if (account.Preferences.Currency != userPreferences.Currency)
                {
                    var pair = $"{account.Preferences.Currency}_{userPreferences.Currency}";
                    spendingChart.Data.Add(new AccountSpendingChartData()
                    {
                        Name = _accountCategories.FirstOrDefault(ac => ac.Id == t.Key)?.Name,
                        Value = t.Sum(trr => trr.Amount) * -1,
                        ConvertedValue = await _currencyConversionService.Convert(pair, t.Sum(trr => trr.Amount) * -1)
                    });
                }
                else
                {
                    spendingChart.Data.Add(new AccountSpendingChartData()
                    {
                        Name = _accountCategories.FirstOrDefault(ac => ac.Id == t.Key)?.Name,
                        Value = t.Sum(trr => trr.Amount) * -1,
                        ConvertedValue = 0
                    });
                }
                
            }

            return spendingChart;

        }

        private async Task<bool> AddDefaultCategories(Guid accountId)
        {
            foreach (var expenseCategory in DefaultCategories.ExpenseCategories)
            {
                await _accountCategoryService.CreateAccountCategory(expenseCategory, AccountCategoryType.Expense,
                    accountId);
            }

            foreach (var incomeCategory in DefaultCategories.IncomeCategories)
            {
                await _accountCategoryService.CreateAccountCategory(incomeCategory, AccountCategoryType.Income,
                    accountId);
            }

            return true;
        }
    }
}