using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Account.Base;
using WebApi.Models.Database;
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
        
        [Fact]
        public async Task It_should_create_the_account_with_the_current_account_type()
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

            Assert.Equal(type, account.Type);

            #endregion
        }
        
        [Fact]
        public async Task It_should_create_the_account_with_the_investment_account_type()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Investment;
            var initialBalance = 1;
            #endregion

            #region Act
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Assert

            Assert.Equal(type, account.Type);

            #endregion
        }
        
        [Fact]
        public async Task It_should_create_the_account_with_the_credit_account_type()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.CreditCard;
            var initialBalance = 1;
            #endregion

            #region Act
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Assert

            Assert.Equal(type, account.Type);

            #endregion
        }
        
        [Fact]
        public async Task It_should_create_the_account_with_the_savings_account_type()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Savings;
            var initialBalance = 1;
            #endregion

            #region Act
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Assert

            Assert.Equal(type, account.Type);

            #endregion
        }
        
        [Fact]
        public async Task It_should_create_an_account_even_if_the_initial_balance_of_0_is_provided()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.CreditCard;
            var initialBalance = 0;
            #endregion

            #region Act
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Assert

            Assert.Equal(initialBalance, account.Balance);

            #endregion
        }
        
        [Fact]
        public async Task It_should_add_account_preferences_for_the_newly_created_account()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Current;
            var initialBalance = 0;
            #endregion

            #region Act
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Assert
            Assert.NotNull(account.Preferences);
            #endregion
        }
        
        [Fact]
        public async Task It_should_create_account_with_the_default_currency_of_the_users_account()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Current;
            var initialBalance = 0;
            var testUser = await _helper.CreateUser("testuser@notexample.com", "test1234");
            var userPreferences = new UserPreferences("GBP", testUser.Id);
            await _context.UserPreferences.AddAsync(userPreferences);
            await _context.SaveChangesAsync();
            #endregion

            #region Act
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Assert
            Assert.Equal(userPreferences.Currency, account.Preferences.Currency);
            #endregion
        }
        
        
        
        
    }
}