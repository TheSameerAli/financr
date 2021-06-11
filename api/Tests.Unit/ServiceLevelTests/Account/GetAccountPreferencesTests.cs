using System.IO;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Account.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Account
{
    public class GetAccountPreferencesTests : AccountServiceTestBase
    {
        [Fact]
        public async Task It_should_get_account_preferences_prvided_the_account_id()
        {
            #region Arrange
            var account1 = await _helper.CreateAccount("Account 1", AccountType.Current, _testUser.Id);
            var accountCategory1 = await _helper.CreateAccountCategory("testcategory", AccountCategoryType.Income, account1.Id);
            var preferences1 = new AccountPreferences("GBP", account1.Id);
            await _context.AccountPreferences.AddAsync(preferences1);
            await _context.SaveChangesAsync();
            #endregion


            #region Act

            var preferences = await _accountService.GetAccountPreferences(account1.Id);

            #endregion

            #region Assert

            Assert.NotNull(preferences);
            Assert.Equal("GBP", preferences.Currency);

            #endregion
        }
    }
}