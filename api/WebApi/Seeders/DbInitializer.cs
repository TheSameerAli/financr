using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Seeders.Interface;

namespace WebApi.Seeders
{
    public static class DbInitializer
    {
        public static async Task Seed(ApplicationDbContext context)
        {
            var seeders = new List<ISeeder>
            {
                new UserSeeder(),
                new AccountPreferenceSeeder(),
                new UserPreferencesSeeder()
            };

            foreach (var seeder in seeders)
            {
                await seeder.Seed(context);
            }
        }
    }
}