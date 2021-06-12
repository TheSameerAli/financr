using System;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Transactions.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Transactions
{
    public class DeleteTransactionTests : TransactionServiceTestBase
    {
        [Fact]
        public async Task It_should_delete_the_transaction_from_the_system_provided_the_correct_id()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Act

            var deleted = await _transactionService.DeleteTransaction(transaction.Id);
            var t = await _transactionService.GetTransactionById(transaction.Id);
            #endregion

            #region Assert
            Assert.True(deleted);
            Assert.Null(t);
            #endregion
        }
        
        [Fact]
        public async Task It_should_return_false_if_invalid_transaction_id_is_provided()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            #endregion

            #region Act

            var deleted = await _transactionService.DeleteTransaction(Guid.NewGuid());
            var t = await _transactionService.GetTransactionById(transaction.Id);
            #endregion

            #region Assert
            Assert.False(deleted);
            Assert.NotNull(t);
            #endregion
        }
    }
}