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
        Task<List<NetworthMonth>> GetNetworthByMonth(Guid userId);
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
        
        public async Task<List<NetworthMonth>> GetNetworthByMonth(Guid userId)
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
            var networthMonths = new List<NetworthMonth>();
            foreach (var t in transactionsByMonth)
            {
                var monthYear = t.Key.Split("/");
                var dateTime = new DateTime(int.Parse(monthYear[1]), 
                    int.Parse(monthYear[0]), 1, 0, 0, 0);
                if (networthMonths.Count > 0)
                {
                    networthMonths.Add(new NetworthMonth(dateTime, t.Sum(tr => tr.Income) + networthMonths.LastOrDefault().Amount));

                }
                else
                {
                    networthMonths.Add(new NetworthMonth(dateTime, t.Sum(tr => tr.Income)));
                }
            }

            return networthMonths;

        }
    }
}