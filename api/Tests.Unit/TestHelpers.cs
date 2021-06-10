using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Services;

namespace Tests.Unit
{
    public class TestHelpers
    {
        private ApplicationDbContext _context;
        private TestServer _server;

        public TestHelpers(ApplicationDbContext context, TestServer server)
        {
            _context = context;
            _server = server;
        }

        public async Task<User> CreateUser(string email, string password)
        {
            var userService = GetService<IUserService>();
            var user = await userService.Create(email, password);
            return user;
        }
        
        public T GetService<T>()
        {
            return (T)_server.Host.Services.GetService(typeof(T));
        }

        public HttpContent MakePayload(dynamic obj)
        {
            string jsonNewAnswer = JsonConvert.SerializeObject(obj,  Formatting.Indented,
                new JsonSerializerSettings {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            HttpContent payload = new StringContent(jsonNewAnswer, Encoding.UTF8, "application/json");
            return payload;
        }
    }
}