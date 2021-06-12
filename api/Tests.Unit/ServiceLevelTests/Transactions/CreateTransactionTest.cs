using System;
using System.IO;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Transactions.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Transactions
{
    public class CreateTransactionTest : TransactionServiceTestBase
    {
        [Fact]
        public async Task It_should_create_a_transaction_provided_the_correct_details()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            #endregion

            #region Act
            var transaction = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Assert
            Assert.NotNull(transaction);
            Assert.Equal("test transaction", transaction.Description);
            #endregion
        }

        [Fact]
        public async Task
            It_should_store_a_negative_value_if_expense_category_is_provided_and_positive_value_is_provided()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            #endregion

            #region Act
            var transaction = await _transactionService
                .Create(10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Assert
            Assert.NotNull(transaction);
            Assert.Equal(-10, transaction.Amount);
            #endregion
        }

        [Fact]
        public async Task
            It_should_store_a_negative_value_if_expense_category_is_provided_and_negative_value_is_provided()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            #endregion

            #region Act
            var transaction = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Assert
            Assert.NotNull(transaction);
            Assert.Equal(-10, transaction.Amount);
            #endregion
        }

        [Fact]
        public async Task It_should_store_positive_value_if_income_category_is_provided_and_negative_value_is_provided()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Income, account.Id);
            #endregion

            #region Act
            var transaction = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Assert
            Assert.NotNull(transaction);
            Assert.Equal(10, transaction.Amount);
            #endregion
        }

        [Fact]
        public async Task It_should_store_positive_value_if_income_category_is_provided_and_positive_value_is_provided()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Income, account.Id);
            #endregion

            #region Act
            var transaction = await _transactionService
                .Create(10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Assert
            Assert.NotNull(transaction);
            Assert.Equal(10, transaction.Amount);
            #endregion
        }

        [Fact]
        public async Task It_should_throw_exception_if_zero_value_is_provided_as_an_amount()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Income, account.Id);
            #endregion

            #region Assert
            await Assert.ThrowsAsync<InvalidDataException>(() => _transactionService
                .Create(0, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id));
            #endregion
        }
    }
}