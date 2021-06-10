using WebApi.Services;

namespace Tests.Unit.ServiceLevelTests.Account.Base
{
    public class AccountServiceTestBase : BaseTest
    {
        protected readonly IAccountService _accountService;

        public AccountServiceTestBase()
        {
            _accountService = _helper.GetService<IAccountService>();
        }
    }
}