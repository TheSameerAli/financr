using Moq;
using WebApi.Context;
using WebApi.Services;

namespace Tests.Unit.ServiceLevelTests.Transactions.Base
{
    public class TransactionServiceTestBase : BaseTest
    {
        protected ITransactionService _transactionService;

        public TransactionServiceTestBase()
        {
            var currencyConversionServiceMock = new Mock<ICurrencyConversionService>();
            currencyConversionServiceMock.Setup(ccsm =>
                ccsm.Convert(It.IsAny<string>(), It.IsAny<double>())).ReturnsAsync(10);
            
            _transactionService = new TransactionService(
                _helper.GetService<IUnitOfWork>(), 
                _helper.GetService<IRecurringTransactionsService>(), 
                _helper.GetService<IUserService>(), currencyConversionServiceMock.Object);
        }

    }
}