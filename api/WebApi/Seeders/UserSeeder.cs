using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Seeders.Interface;
using WebApi.Utilities.Hasher;

namespace WebApi.Seeders
{
    public class UserSeeder : ISeeder
    {
        public async Task Seed(ApplicationDbContext context)
        {
            if (!context.Users.Any())
            {
                var password = "123456";
                var pwdHasher = new PasswordHasher();
                var user = new User("sam.eer.ali@hotmail.co.uk", pwdHasher.Hash(password));
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync().ConfigureAwait(false);
            }
        }
    }
}