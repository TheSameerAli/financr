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
    public class AccountPreferenceSeeder : ISeeder
    {
        public async Task Seed(ApplicationDbContext context)
        {
            var accounts = await context.Accounts.Include(a => a.Preferences).ToListAsync();
            foreach (var account in accounts)
            {
                if (account.Preferences == null)
                {
                    var preference = new AccountPreferences("GBP", account.Id);
                    await context.AccountPreferences.AddAsync(preference);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}