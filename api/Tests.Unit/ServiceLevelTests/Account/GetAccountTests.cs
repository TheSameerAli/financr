using System;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Account.Base;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Account
{
    public class GetAccountTests : AccountServiceTestBase
    {
         [Fact]
        public async Task It_should_get_an_account_if_requested_by_the_user()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var account2 = await _helper.CreateAccount("Account 2", AccountType.Investment, _testUser.Id);
            #endregion

            #region Act
            var account = await _accountService.GetAccount(account1.Id, _testUser.Id);
            #endregion

            #region Assert
            Assert.NotNull(account);
            #endregion
        }
        
        [Fact]
        public async Task It_should_include_transactions_for_the_account()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var accountCategory = await _helper.CreateAccountCategory("testcategory", AccountCategoryType.Income, account1.Id);
            var transaction = new Transaction(10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account1.Id);
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
            #endregion

            #region Act
            var account = await _accountService.GetAccount(account1.Id, _testUser.Id);
            #endregion

            #region Assert
            Assert.NotNull(account);
            Assert.NotNull(account.Transactions);
            Assert.NotEmpty(account.Transactions);
            #endregion
        }
        
        [Fact]
        public async Task It_should_include_account_preferences_with_the_account()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var accountCategory = await _helper.CreateAccountCategory("testcategory", AccountCategoryType.Income, account1.Id);
            var preferences = new AccountPreferences("GBP", account1.Id);
            await _context.AccountPreferences.AddAsync(preferences);
            await _context.SaveChangesAsync();
            #endregion

            #region Act
            var account = await _accountService.GetAccount(account1.Id, _testUser.Id);
            #endregion

            #region Assert
            Assert.NotNull(account);
            Assert.NotNull(account.Preferences);
            Assert.Equal("GBP", account.Preferences.Currency);
            #endregion
        }
        
        [Fact]
        public async Task It_should_have_converted_currency_for_the_account_if_the_user()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var accountCategory1 = await _helper.CreateAccountCategory("testcategory", AccountCategoryType.Income, account1.Id);
            var preferences1 = new AccountPreferences("USD", account1.Id);
            await _context.AccountPreferences.AddAsync(preferences1);
            await _context.SaveChangesAsync();
            #endregion

            #region Act
            var account = await _accountService.GetAccount(account1.Id, _testUser.Id);
            #endregion

            #region Assert
            Assert.Equal(10, account.ConvertedBalance);
            #endregion
        }
        
        [Fact]
        public async Task It_should_return_zero_as_converted_balance_if_the_currency_of_user_and_account_is_the_same()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var accountCategory1 = await _helper.CreateAccountCategory("testcategory", AccountCategoryType.Income, account1.Id);
            var preferences1 = new AccountPreferences("GBP", account1.Id);
            await _context.AccountPreferences.AddAsync(preferences1);
            await _context.SaveChangesAsync();
            #endregion

            #region Act
            var account = await _accountService.GetAccount(account1.Id, _testUser.Id);
            #endregion

            #region Assert
            Assert.Equal(0, account.ConvertedBalance);
            #endregion
        }
        
    }
}