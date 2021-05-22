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
        Task<DashboardData> GetDashboardData(Guid userId);
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


        public async Task<DashboardData> GetDashboardData(Guid userId)
        {
            var thisMonthStartDate = DateTimeOffset.Now.AddMonths(-1);
            var thisMonthEndDate = DateTimeOffset.Now;

            var lastMonthStartDate = DateTimeOffset.Now.AddMonths(-2);
            var lastMonthEndDate = DateTimeOffset.Now.AddMonths(-1);

            var lastMonthsSnapshot = new List<Transaction>();
            var thisMonthsSnapshot = new List<Transaction>();

            var accounts = await _accounts.Where(a => a.UserId == userId).ToListAsync();

            foreach (var account in accounts)
            {
                var lastMonthsTransactions = await _transactions
                    .Where(t => t.AccountId == account.Id)
                    .Where(t => t.TransactionDate >= lastMonthStartDate && t.TransactionDate <= lastMonthEndDate)
                    .Include(t => t.Account)
                    .ToListAsync();
                var thisMonthsTransactions = await _transactions
                    .Where(t => t.AccountId == account.Id)
                    .Where(t => t.TransactionDate >= thisMonthStartDate && t.TransactionDate <= thisMonthEndDate)
                    .Include(t => t.Account)
                    .ToListAsync();
                lastMonthsSnapshot.AddRange(lastMonthsTransactions);
                thisMonthsSnapshot.AddRange(thisMonthsTransactions);
            }
            
            
            
            
            var incomeCard = new FigureCard(
                thisMonthsSnapshot.Where(t => t.Amount > 0).Sum(t => t.Amount),
                _calcPercChange(
                    lastMonthsSnapshot.Where(t => t.Amount > 0).Sum(t => t.Amount), 
                    thisMonthsSnapshot.Where(t => t.Amount > 0).Sum(t => t.Amount)
                    )
                );
            var expenseCard = new FigureCard(
                thisMonthsSnapshot.Where(t => t.Amount < 0).Sum(t => t.Amount),
                _calcPercChange(
                    lastMonthsSnapshot.Where(t => t.Amount < 0).Sum(t => t.Amount), 
                    thisMonthsSnapshot.Where(t => t.Amount < 0).Sum(t => t.Amount)
                )
            );
            var savingsCard = new FigureCard(thisMonthsSnapshot.Where(t => t.Account.Type == AccountType.Savings).Sum(t => t.Amount),
                _calcPercChange(
                    lastMonthsSnapshot.Where(t => t.Account.Type == AccountType.Savings).Sum(t => t.Amount), 
                    thisMonthsSnapshot.Where(t => t.Account.Type == AccountType.Savings).Sum(t => t.Amount)
                ));

            return new DashboardData(incomeCard, expenseCard, savingsCard);
        }

        private double _calcPercChange(double oldValue, double newValue)
        {
            if (oldValue == 0 && newValue != 0)
            {
                return 100;
            }
            return Math.Round((newValue - oldValue) / oldValue, 2);
        }
    }
}