using System.IO;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Account.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Account
{
    public class ChangeCurrencyTests : AccountServiceTestBase
    {
        [Fact]
        public async Task It_should_change_account_currency_provided_a_different_currency()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var accountCategory1 = await _helper.CreateAccountCategory("testcategory", AccountCategoryType.Income, account1.Id);
            var preferences1 = new AccountPreferences("GBP", account1.Id);
            await _context.AccountPreferences.AddAsync(preferences1);
            await _context.SaveChangesAsync();
            #endregion

            #region Act
            await _accountService.ChangeCurrency("USD", account1.Id);
            var account = await _accountService.GetAccount(account1.Id, _testUser.Id);
            #endregion

            #region Assert
            Assert.Equal("USD", account.Preferences.Currency);
            #endregion
        }
        
        [Fact]
        public async Task It_should_throw_an_exception_if_an_invalid_currency_is_provided()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var accountCategory1 = await _helper.CreateAccountCategory("testcategory", AccountCategoryType.Income, account1.Id);
            var preferences1 = new AccountPreferences("GBP", account1.Id);
            await _context.AccountPreferences.AddAsync(preferences1);
            await _context.SaveChangesAsync();
            #endregion


            #region Assert
            await Assert.ThrowsAsync<InvalidDataException>(() => _accountService.ChangeCurrency("BLAH", account1.Id));
            #endregion
        }
    }
}