using System.Threading.Tasks;
using WebApi.Context;

namespace WebApi.Seeders.Interface
{
    public interface ISeeder
    {
        Task Seed(ApplicationDbContext context);
    }
}