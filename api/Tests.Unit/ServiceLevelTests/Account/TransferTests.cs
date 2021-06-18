using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tests.Unit.ServiceLevelTests.Account.Base;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using WebApi.Services;
using Xunit;

namespace Tests.Unit.ServiceLevelTests.Account
{
    public class TransferTests : AccountServiceTestBase
    {
        [Fact]
        public async Task It_should_successfully_transfer_the_provided_money_from_one_account_to_another()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);

            #region Act
            Assert.Equal(2, fromAccount.Transactions.Count);
            Assert.Equal(1, toAccount.Transactions.Count);
            Assert.Equal(5, toAccount.Balance);
            Assert.Equal(5, fromAccount.Balance);
            #endregion
        }

        [Fact]
        public async Task It_should_convert_balance_if_the_currency_of_2_accounts_is_different()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id, "USD");
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);

            #region Act
            Assert.Equal(2, fromAccount.Transactions.Count);
            Assert.Single(toAccount.Transactions);
            Assert.Equal(10, toAccount.Balance);
            Assert.Equal(5, fromAccount.Balance);
            #endregion
        }

        [Fact]
        public async Task It_should_not_convert_balance_if_the_currency_of_2_accounts_is_the_same()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);

            #region Act
            Assert.Equal(2, fromAccount.Transactions.Count);
            Assert.Equal(1, toAccount.Transactions.Count);
            Assert.Equal(5, toAccount.Balance);
            Assert.Equal(5, fromAccount.Balance);
            #endregion
        }

        [Fact]
        public async Task It_should_create_an_expense_transaction_on_the_from_account()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);

            #region Act
            
            Assert.Equal(-5, fromAccount.Transactions.Where(t => t.Amount < 0).ToList()[0].Amount);
            #endregion
        }

        [Fact]
        public async Task It_should_create_an_expense_category_named_transfer_on_the_from_account_if_it_doesnt_exist()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);
            var accountCategoryService = _helper.GetService<IAccountCategoryService>();
            var accountCategories = await accountCategoryService.GetAccountCategories(fromAccount.Id);

            #region Act
            Assert.Equal(2, accountCategories.Count);
            Assert.Equal("Transfer", accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Name);
            Assert.Equal(AccountCategoryType.Expense, accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Type);
            #endregion
        }

        [Fact]
        public async Task
            It_should_not_create_an_expense_category_named_transfer_on_the_from_account_if_it_already_exist()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var fromAccountCategoryTransfer =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Expense, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);
            var accountCategoryService = _helper.GetService<IAccountCategoryService>();
            var accountCategories = await accountCategoryService.GetAccountCategories(fromAccount.Id);

            #region Act
            Assert.Equal(2, accountCategories.Count);
            Assert.Equal("Transfer", accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Name);
            Assert.Equal(AccountCategoryType.Expense, accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Type);
            #endregion
        }

        [Fact]
        public async Task It_should_create_an_income_transaction_on_the_to_account()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);

            #region Act
            
            Assert.Equal(5, toAccount.Transactions.Where(t => t.Amount > 0).ToList()[0].Amount);
            #endregion
        }

        [Fact]
        public async Task
            It_should_create_an_income_account_category_named_transfer_on_the_to_account_if_it_doesnt_exist()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);

            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);
            var accountCategoryService = _helper.GetService<IAccountCategoryService>();
            var accountCategories = await accountCategoryService.GetAccountCategories(toAccount.Id);

            #region Act
            Assert.Single(accountCategories);
            Assert.Equal("Transfer", accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Name);
            Assert.Equal(AccountCategoryType.Income, accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Type);
            #endregion
        }

        [Fact]
        public async Task
            It_should_not_create_an_income_account_category_named_transfer_on_the_to_account_if_it_already_exists()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var fromAccountCategoryTransfer =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Expense, fromAccount.Id);
            var toAccountCategory =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Income, toAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);
            #endregion

            var transfer = await _accountService.Transfer(fromAccount.Id, toAccount.Id, 5, _testUser.Id);
            fromAccount = await _accountService.GetAccount(fromAccount.Id, _testUser.Id);
            toAccount = await _accountService.GetAccount(toAccount.Id, _testUser.Id);
            var accountCategoryService = _helper.GetService<IAccountCategoryService>();
            var accountCategories = await accountCategoryService.GetAccountCategories(toAccount.Id);

            #region Act
            Assert.Equal(2, accountCategories.Count);
            Assert.Equal("Transfer", accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Name);
            Assert.Equal(AccountCategoryType.Income, accountCategories.FirstOrDefault(ac => ac.Name == "Transfer")?.Type);
            #endregion
        }

        [Fact]
        public async Task It_should_disallow_zero_transfer_values()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var fromAccountCategoryTransfer =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Expense, fromAccount.Id);
            var toAccountCategory =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Income, toAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);
            #endregion


            await Assert.ThrowsAsync<InvalidDataException>(() =>
            {
                return _accountService.Transfer(fromAccount.Id, toAccount.Id, 0, _testUser.Id);
            });
        }
        
        [Fact]
        public async Task It_should_disallow_negative_transfer_values()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var fromAccountCategoryTransfer =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Expense, fromAccount.Id);
            var toAccountCategory =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Income, toAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);
            #endregion


            await Assert.ThrowsAsync<InvalidDataException>(() =>
            {
                return _accountService.Transfer(fromAccount.Id, toAccount.Id, -5, _testUser.Id);
            });
        }

        [Fact]
        public async Task
            It_should_throw_an_exception_if_the_amount_on_from_account_is_lower_than_the_amount_requested_for_transfer()
        {
            #region Arrange
            var fromAccount = await _helper.CreateAccount("From Account", AccountType.Current, _testUser.Id);
            var toAccount = await _helper.CreateAccount("To Account", AccountType.Current, _testUser.Id);
            var fromAccountCategory =
                await _helper.CreateAccountCategory("Test", AccountCategoryType.Income, fromAccount.Id);
            var fromAccountCategoryTransfer =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Expense, fromAccount.Id);
            var toAccountCategory =
                await _helper.CreateAccountCategory("Transfer", AccountCategoryType.Income, toAccount.Id);
            var transaction = await _helper.CreateTransaction(10, "test", fromAccountCategory.Id, fromAccount.Id);
            #endregion


            await Assert.ThrowsAsync<InvalidDataException>(() =>
            {
                return _accountService.Transfer(fromAccount.Id, toAccount.Id, 11, _testUser.Id);
            });
        }
        
    }
}