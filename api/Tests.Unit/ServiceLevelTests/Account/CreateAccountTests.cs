using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Account.Base;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Account
{
    public class CreateAccountTests : AccountServiceTestBase
    {
        [Fact]
        public async Task It_should_create_an_account_provided_the_correct_details_of_an_account()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Current;
            var initialBalance = 1;
            #endregion

            #region Act
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Assert

            Assert.Equal(name, account.Name);
            Assert.Equal(type, account.Type);
            Assert.Equal(initialBalance, account.Balance);

            #endregion
        }
    }
}