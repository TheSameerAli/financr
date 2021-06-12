using System;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Transactions.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Transactions
{
    public class GetTransactionByIdTests : TransactionServiceTestBase
    {
        [Fact]
        public async Task It_should_get_transactions_provided_the_id()
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

            var transaction = await _transactionService.GetTransactionById(transaction1.Id);
            
            #endregion

            #region Assert
            Assert.NotNull(transaction);
            Assert.Equal(-10, transaction.Amount);
            #endregion
        }

        [Fact]
        public async Task It_should_return_null_if_the_transaction_is_not_found()
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

            var transaction = await _transactionService.GetTransactionById(Guid.NewGuid());
            
            #endregion

            #region Assert
            Assert.Null(transaction);
            #endregion
        }

        [Fact]
        public async Task It_should_include_account_category_with_the_transaction()
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

            var transaction = await _transactionService.GetTransactionById(transaction1.Id);
            
            #endregion

            #region Assert
            Assert.NotNull(transaction.AccountCategory);
            #endregion
        }
        
        [Fact]
        public async Task It_should_include_transaction_notes_with_the_transaction()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transactionNote = await _helper.CreateTransactionNote("Test transaction note", transaction1.Id);
            #endregion

            #region Act

            var transaction = await _transactionService.GetTransactionById(transaction1.Id);
            
            #endregion

            #region Assert
            Assert.NotNull(transaction.TransactionNote);
            Assert.Equal("Test transaction note", transaction1.TransactionNote.Note);
            #endregion
        }
    }
}