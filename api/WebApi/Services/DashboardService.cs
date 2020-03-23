using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain.Networth;

namespace WebApi.Services
{
    public interface IDashboardService
    {
        Task<DashboardChart> GetDashboardChartData(Guid userId);
    }
    public class DashboardService : IDashboardService
    {
        private readonly IUnitOfWork _uow;
        private DbSet<Transaction> _transactions;
        private DbSet<Account> _accounts;
        public DashboardService(IUnitOfWork uow)
        {
            _uow = uow;
            _transactions = _uow.Set<Transaction>();
            _accounts = _uow.Set<Account>();
        }
        
        public async Task<DashboardChart> GetDashboardChartData(Guid userId)
        {
            var accounts = await _accounts
                .Where(a => a.UserId == userId)
                .Include(a => a.Transactions)
                .ThenInclude(t => t.AccountCategory)
                .ToListAsync();
            var transactions = accounts.SelectMany(account => account.Transactions).ToList(); 
            var transactionsByMonth = 
                transactions.GroupBy(t => t.TransactionDate.Month + "/" + t.TransactionDate.Year)
                    .OrderBy(t => t.Key);
            var networth = GetNetworthData(transactionsByMonth);
            var spending = GetSpendingData(transactionsByMonth);
            
            var dashboardChart = new DashboardChart()
            {
                Networth = networth,
                Spending = spending
            };
            

            return dashboardChart;

        }


        private List<MonthlyAmount> GetNetworthData(IOrderedEnumerable<IGrouping<string,Transaction>> transactions)
        {
            var networthMonths = new List<MonthlyAmount>();
            foreach (var t in transactions)
            {
                var monthYear = t.Key.Split("/");
                var dateTime = new DateTime(int.Parse(monthYear[1]), 
                    int.Parse(monthYear[0]), 1, 0, 0, 0);
                if (networthMonths.Count > 0)
                {
                    networthMonths.Add(new MonthlyAmount(dateTime, t.Sum(tr => tr.Income) + networthMonths.LastOrDefault().Amount));

                }
                else
                {
                    networthMonths.Add(new MonthlyAmount(dateTime, t.Sum(tr => tr.Income)));
                }
            }

            return networthMonths;
        }
        
        private List<MonthlyAmount> GetSpendingData(IOrderedEnumerable<IGrouping<string,Transaction>> transactions)
        {
            var networthMonths = new List<MonthlyAmount>();
            foreach (var t in transactions)
            {
                
                var monthYear = t.Key.Split("/");
                var dateTime = new DateTime(int.Parse(monthYear[1]), 
                    int.Parse(monthYear[0]), 1, 0, 0, 0);
                if (networthMonths.Count > 0)
                {
                    networthMonths.Add(
                        new MonthlyAmount(
                            dateTime, t.Sum(tr => tr.Income < 0 ? tr.Income : 0) + 
                                      networthMonths.LastOrDefault().Amount));

                }
                else
                {
                    networthMonths.Add(new MonthlyAmount(dateTime, 
                        t.Sum(tr => tr.Income < 0 ? tr.Income : 0)));
                }
            }

            return networthMonths;
        }
    }
}