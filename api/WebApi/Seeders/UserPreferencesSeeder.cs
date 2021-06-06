using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Configuration;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Seeders.Interface;
using WebApi.Utilities.Hasher;

namespace WebApi.Seeders
{
    public class UserPreferencesSeeder : ISeeder
    {
        public async Task Seed(ApplicationDbContext context)
        {
            var users = await context.Users.Include(a => a.Preferences).ToListAsync();
            foreach (var user in users)
            {
                if (user.Preferences == null)
                {
                    var preference = new UserPreferences("GBP", user.Id);
                    await context.UserPreferences.AddAsync(preference);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}