using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;

namespace WebApi.Services
{
    public interface IAccountCategoryService
    {
        Task<List<AccountCategory>> GetAccountCategories(Guid accountId);
        Task<AccountCategory> CreateAccountCategory(string name, AccountCategoryType type, Guid accountId);
        Task<bool> DeleteCategory(Guid accountCategoryId);
        Task<AccountCategory> EditCategory(string name, Guid categoryId, Guid accountId);
    }
    
    
    public class AccountCategoryService : IAccountCategoryService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<AccountCategory> _accountCategories;
        public AccountCategoryService(IUnitOfWork uow)
        {
            _uow = uow;
            _accountCategories = _uow.Set<AccountCategory>();
        }
        
        public async Task<List<AccountCategory>> GetAccountCategories(Guid accountId)
        {
            return await _accountCategories
                .Where(ac => ac.AccountId == accountId)
                .OrderBy(ac => ac.Name)
                .ToListAsync();
        }

        public async Task<AccountCategory> CreateAccountCategory(string name, AccountCategoryType type, Guid accountId)
        {
            var accountCategory = new AccountCategory(name, type, accountId);
            await _accountCategories.AddAsync(accountCategory);
            await _uow.SaveChangesAsync();
            return accountCategory;
        }

        public async Task<AccountCategory> EditCategory(string name, Guid categoryId, Guid accountId)
        {
            var accountCategory = await _accountCategories.Where(ac => ac.Id == categoryId).FirstOrDefaultAsync();
            accountCategory.Name = name;
            await _uow.SaveChangesAsync();
            return accountCategory;
        }

        public async Task<bool> DeleteCategory(Guid accountCategoryId)
        {
            var accountCategory = await _accountCategories.FirstOrDefaultAsync(ac => ac.Id == accountCategoryId);
            if (accountCategory == null)
            {
                return false;
            }
            _accountCategories.Remove(accountCategory);
            await _uow.SaveChangesAsync();
            return true;
        }
    }
}