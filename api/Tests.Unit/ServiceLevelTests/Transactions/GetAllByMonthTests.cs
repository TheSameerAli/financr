using System;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Transactions.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Transactions
{
    public class GetAllByMonthTests : TransactionServiceTestBase
    {
        [Fact]
        public async Task It_should_get_all_the_transactions_for_the_provided_month_for_an_account()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transaction3 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddMonths(-2), accountCategory.Id, account.Id);
            
            #endregion

            #region Act

            var transactions = await _transactionService.GetAllByMonth(account.Id, DateTimeOffset.Now.Date);
            
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
            var transaction3 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddMonths(-2), accountCategory.Id, account.Id);
            
            #endregion

            #region Act

            var transactions = await _transactionService.GetAllByMonth(account.Id, DateTimeOffset.Now.Date);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.NotNull(transactions[0].AccountCategory);
            Assert.NotNull(transactions[1].AccountCategory);
            #endregion
        }

        [Fact]
        public async Task It_should_first_order_the_transaction_by_date()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now.AddMinutes(-10), accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transaction3 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddMonths(-2), accountCategory.Id, account.Id);
            
            #endregion

            #region Act

            var transactions = await _transactionService.GetAllByMonth(account.Id, DateTimeOffset.Now.Date);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.Equal(-20 , transactions[0].Amount);
            Assert.Equal(-10 , transactions[1].Amount);
            #endregion
        }

        [Fact]
        public async Task It_should_get_order_the_transactions_by_created_date()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now.AddMinutes(-10), accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddMinutes(-10), accountCategory.Id, account.Id);
            var transaction3 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now.AddMonths(-2), accountCategory.Id, account.Id);
            
            #endregion

            #region Act

            var transactions = await _transactionService.GetAllByMonth(account.Id, DateTimeOffset.Now.Date);
            
            #endregion

            #region Assert
            Assert.NotEmpty(transactions);
            Assert.Equal(2, transactions.Count);
            Assert.Equal(-20 , transactions[0].Amount);
            Assert.Equal(-10 , transactions[1].Amount);
            #endregion
        }
    }
}