using System;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Transactions.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Transactions
{
    public class UpdateTransactionNoteTests : TransactionServiceTestBase
    {
        [Fact]
        public async Task It_should_create_a_new_transaction_note_if_it_doesnt_exist()
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

            var transactionNote = await _transactionService.UpdateTransactionNote("Test Note", transaction1.Id);
            
            #endregion

            #region Assert
            Assert.NotNull(transactionNote);
            Assert.Equal("Test Note", transactionNote.Note);
            #endregion
        }

        [Fact]
        public async Task It_should_update_the_existing_transaction_note_if_it_does_exist()
        {
            #region Arrange
            var account = await _helper.CreateAccount("testaccount", AccountType.Current, _testUser.Id);
            var accountCategory =
                await _helper.CreateAccountCategory("test account category", AccountCategoryType.Expense, account.Id);
            var transaction1 = await _transactionService
                .Create(-10, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var transaction2 = await _transactionService
                .Create(20, "test transaction", DateTimeOffset.Now, accountCategory.Id, account.Id);
            var tNote = await _helper.CreateTransactionNote("Test transaction note", transaction1.Id);

            #endregion

            #region Act

            var transactionNote = await _transactionService.UpdateTransactionNote("Test Note", transaction1.Id);
            
            #endregion

            #region Assert
            Assert.NotNull(transactionNote);
            Assert.Equal("Test Note", transactionNote.Note);
            #endregion
        }

        [Fact]
        public async Task It_should_allow_empty_string_for_transaction_note()
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

            var transactionNote = await _transactionService.UpdateTransactionNote("", transaction1.Id);
            
            #endregion

            #region Assert
            Assert.NotNull(transactionNote);
            Assert.Equal("", transactionNote.Note);
            #endregion
        }
    }
}