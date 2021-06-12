using System;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Transactions.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Transactions
{
    public class GetAllTransactionsTests : TransactionServiceTestBase
    {
        [Fact]
        public async Task It_should_get_all_the_transactions_for_the_account_provided()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Act

            var transactions = await _transactionService.GetAll(account.Id);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            #endregion
        }

        [Fact]
        public async Task It_should_include_account_category_for_each_transaction()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Act

            var transactions = await _transactionService.GetAll(account.Id);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.NotNull(transactions[0].AccountCategory);
            Assert.NotNull(transactions[1].AccountCategory);
            #endregion
        }

        [Fact]
        public async Task It_should_order_all_the_transaction_by_newest_first_of_transaction_date()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now.AddDays(-1), accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Act

            var transactions = await _transactionService.GetAll(account.Id);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.Equal(-20, transactions[0].Amount);
            Assert.Equal(-10, transactions[1].Amount);
            #endregion
        }

        [Fact]
        public async Task It_should_order_all_the_transactions_by_newst_first_as_created_after_the_transaction_date()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now.AddDays(-1), accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddDays(-1), accountCategory.Id, account.Id);
            #endregion

            #region Act

            var transactions = await _transactionService.GetAll(account.Id);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.Equal(-10, transactions[1].Amount);
            Assert.Equal(-20, transactions[0].Amount);
            #endregion
        }

        [Fact]
        public async Task
            It_should_return_converted_amount_for_transaction_if_the_user_preferences_and_account_currency_is_different()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id, "USD");
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now.AddDays(-1), accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddDays(-1), accountCategory.Id, account.Id);
            #endregion

            #region Act

            var transactions = await _transactionService.GetAll(account.Id);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.Equal(10, transactions[0].ConvertedAmount);
            Assert.Equal(10, transactions[1].ConvertedAmount);
            #endregion
        }

        [Fact]
        public async Task
            It_should_return_converted_amount_as_zero_for_transactions_if_the_user_preferences_and_account_currency_is_the_same()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id, "GBP");
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now.AddDays(-1), accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddDays(-1), accountCategory.Id, account.Id);
            #endregion

            #region Act

            var transactions = await _transactionService.GetAll(account.Id);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.Equal(0, transactions[0].ConvertedAmount);
            Assert.Equal(0, transactions[1].ConvertedAmount);
            #endregion
        }
    }
}