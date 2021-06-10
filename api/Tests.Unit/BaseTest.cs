using System.Threading.Tasks;
using Hangfire.Logging;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using WebApi.Context;
using WebApi.Models.Database;
using Xunit;

namespace Tests.Unit
{
    public class BaseTest : IAsyncLifetime
    {
        protected TestServer _server;
        protected ApplicationDbContext _context;
        protected TestHelpers _helper;
        protected User _testUser;
        

        protected BaseTest()
        {
            _server = new TestServer(
                new WebHostBuilder()
                    .UseStartup<Startup>());
            
            _context = _server.Host.Services.GetService(typeof(ApplicationDbContext)) as ApplicationDbContext;
            _helper = new TestHelpers(_context, _server);
        }

        public async Task InitializeAsync()
        {
            _testUser = await _helper.CreateUser("testuser@example.com", "123456");
        }

        public Task DisposeAsync()
        {
            return Task.CompletedTask;
        }
    }
}