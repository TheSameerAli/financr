using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using WebApi.Configuration;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Account = WebApi.Models.Database.Account.Account;
using Transaction = WebApi.Models.Database.Transaction;

namespace WebApi.Services
{
    public interface IAccountService
    {
        Task<Account> Create(string name, AccountType type, Guid userId, double initialBalance);
        Task<List<Account>> GetAccounts(Guid userId);
        Task<Account> GetAccount(Guid accountId);
        Task<AccountBudget> SetBudget(double budget, Guid accountId);


    }
    public class AccountService : IAccountService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Account> _accounts;
        private readonly DbSet<Transaction> _transactions;
        private readonly DbSet<AccountCategory> _accountCategories;
        private readonly DbSet<AccountBudget> _accountBudgets;
        private readonly IAccountCategoryService _accountCategoryService;
        public AccountService(IUnitOfWork uow, IAccountCategoryService accountCategoryService)
        {
            _uow = uow;
            _accounts = _uow.Set<Account>();
            _transactions = _uow.Set<Transaction>();
            _accountBudgets = _uow.Set<AccountBudget>();
            _accountCategoryService = accountCategoryService;
            _accountCategories = _uow.Set<AccountCategory>();
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
            await AddDefaultCategories(account.Id);

            if (initialBalance == 0 || initialBalance <= 0) return account;
            var category =
                await _accountCategories.FirstOrDefaultAsync(
                    ac => ac.Name == "Carry Over" && ac.AccountId == account.Id);
            var transaction = new Transaction(initialBalance, "Initial balance", DateTimeOffset.Now, 
                category.Id, account.Id);
            await _transactions.AddAsync(transaction);
            await _uow.SaveChangesAsync();
            return account;
        }

        public async Task<List<Account>> GetAccounts(Guid userId)
        {
            return await _accounts
                .Where(a => a.UserId == userId)
                .Include(a => a.Budget)
                .Include(t => t.Transactions)
                .ToListAsync();
        }

        public async Task<Account> GetAccount(Guid accountId)
        {
            return await _accounts
                .Include(a => a.Transactions)
                .Include(ac => ac.Budget)
                .FirstOrDefaultAsync(a => a.Id == accountId);
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