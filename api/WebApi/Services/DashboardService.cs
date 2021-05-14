using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Domain;
using WebApi.Models.Domain.Dashboard;
using WebApi.Models.Domain.Networth;
using Account = WebApi.Models.Database.Account.Account;

namespace WebApi.Services
{
    public interface IDashboardService
    {
        Task<DashboardChart> GetDashboardChartData(Guid userId);
        Task<DashboardData> GetDashboardData(Guid userId);
    }
    public class DashboardService : IDashboardService
    {
        private readonly IUnitOfWork _uow;
        private DbSet<Transaction> _transactions;
        private DbSet<Account> _accounts;
        private DbSet<RecurringTransaction> _recurringTransactions;
        public DashboardService(IUnitOfWork uow)
        {
            _uow = uow;
            _transactions = _uow.Set<Transaction>();
            _accounts = _uow.Set<Account>();
            _recurringTransactions = _uow.Set<RecurringTransaction>();
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

        public async Task<DashboardData> GetDashboardData(Guid userId)
        {
            var accounts = await _accounts.Where(a => a.UserId == userId).ToListAsync();
            var dashboardProfitLossCard = await GetDashboardProfitLossCard(accounts);
            
            return new DashboardData(dashboardProfitLossCard);
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
                    networthMonths.Add(new MonthlyAmount(dateTime, t.Sum(tr => tr.Amount) + networthMonths.LastOrDefault().Amount));

                }
                else
                {
                    networthMonths.Add(new MonthlyAmount(dateTime, t.Sum(tr => tr.Amount)));
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
                            dateTime, t.Sum(tr => tr.Amount < 0 ? tr.Amount : 0) + 
                                      networthMonths.LastOrDefault().Amount));

                }
                else
                {
                    networthMonths.Add(new MonthlyAmount(dateTime, 
                        t.Sum(tr => tr.Amount < 0 ? tr.Amount : 0)));
                }
            }

            return networthMonths;
        }

        private async Task<DashboardProfitLossCard> GetDashboardProfitLossCard(List<Account> accounts)
        {
            var recurringTransactions = new List<RecurringTransaction>();
            foreach (var account in accounts)
            {
                recurringTransactions.AddRange(await 
                    _recurringTransactions.Where(rt => rt.AccountId == account.Id).ToListAsync());
            }

            var profit = recurringTransactions.Sum(rt => rt.Income * (30 / rt.Occurrence));
            var income = recurringTransactions.Sum(
                rt => rt.Income > 0 ? rt.Income * (30 / rt.Occurrence) : 0);
            var outgoing = recurringTransactions.Sum(rt => rt.Income < 0 ? rt.Income * (30 / rt.Occurrence) : 0);
            
            var creditCardAccounts = accounts.Where(a => a.Type == AccountType.CreditCard).ToList();
            var creditCardTransactions = new List<Transaction>();
            foreach (var creditCardAccount in creditCardAccounts)
            {
                creditCardTransactions.AddRange(await _transactions.Where(t => t.AccountId == creditCardAccount.Id).ToListAsync());
            }
            var debt = creditCardTransactions.Sum(cct => cct.Amount);
            return new DashboardProfitLossCard(profit, income, outgoing, debt);
        }
    }
}