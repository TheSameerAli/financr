using Moq;
using WebApi.Context;
using WebApi.Services;

namespace Tests.Unit.ServiceLevelTests.Account.Base
{
    public class AccountServiceTestBase : BaseTest
    {
        protected readonly IAccountService _accountService;

        public AccountServiceTestBase()
        {
            var currencyConversionServiceMock = new Mock<ICurrencyConversionService>();
            currencyConversionServiceMock.Setup(ccsm =>
                ccsm.Convert(It.IsAny<string>(), It.IsAny<double>())).ReturnsAsync(10);
            
            _accountService = new AccountService(
                _helper.GetService<IUnitOfWork>(),
                _helper.GetService<IAccountCategoryService>(),
                _helper.GetService<IUserService>(),
                currencyConversionServiceMock.Object
                );
        }
    }
}