using System;
using System.Threading.Tasks;
using Moq;
using Tests.Unit.ServiceLevelTests.Account.Base;
using WebApi.Context;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using WebApi.Services;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Account
{
    public class DeleteAccountTests : AccountServiceTestBase
    {
        [Fact]
        public async Task It_should_delete_an_account_upon_providing_correct_id()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Current;
            var initialBalance = 1;
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Act

            var deleted = await _accountService.DeleteAccount(account.Id);
            var a = await _accountService.GetAccount(account.Id, _testUser.Id);
            
            #endregion

            #region Assert

            Assert.True(deleted);
            Assert.Null(a);

            #endregion
        }

        [Fact]
        public async Task It_should_delete_all_transactions_related_to_the_account()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Current;
            var initialBalance = 1;
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            var accountCategory = await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var currencyConversionServiceMock = new Mock<ICurrencyConversionService>();
            currencyConversionServiceMock.Setup(ccsm =>
                ccsm.Convert(It.IsAny<string>(), It.IsAny<double>())).ReturnsAsync(10);
            var transactionService = new TransactionService(
                _helper.GetService<IUnitOfWork>(), 
                _helper.GetService<IRecurringTransactionsService>(), 
                _helper.GetService<IUserService>(), currencyConversionServiceMock.Object);
            var transaction =
                await transactionService.Create(10, "test tr", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Act

            var deleted = await _accountService.DeleteAccount(account.Id);
            var a = await _accountService.GetAccount(account.Id, _testUser.Id);
            var transactions = await transactionService.GetAll(account.Id);
            #endregion

            #region Assert

            Assert.True(deleted);
            Assert.Null(a);
            Assert.Empty(transactions);
            #endregion
        }

        [Fact]
        public async Task It_should_delete_all_account_categories_related_to_the_account()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Current;
            var initialBalance = 1;
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            var accountCategoryService = _helper.GetService<IAccountCategoryService>();
            #endregion

            #region Act

            var deleted = await _accountService.DeleteAccount(account.Id);
            var accountCategories = await accountCategoryService.GetAccountCategories(account.Id);
            #endregion

            #region Assert

            Assert.True(deleted);
            Assert.Empty(accountCategories);
            #endregion
        }

        [Fact]
        public async Task It_should_return_false_if_invalid_id_is_provided_for_account_deletion()
        {
            #region Arrange
            var name = "Test Account";
            var type = AccountType.Current;
            var initialBalance = 1;
            var account = await _accountService.Create(name, type, _testUser.Id, initialBalance);
            #endregion

            #region Act

            var deleted = await _accountService.DeleteAccount(Guid.NewGuid());
            var a = await _accountService.GetAccount(account.Id, _testUser.Id);
            
            #endregion

            #region Assert

            Assert.False(deleted);
            Assert.NotNull(a);

            #endregion
        }
    }
}