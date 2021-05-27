﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Hangfire.Dashboard.Resources;
using Microsoft.EntityFrameworkCore;
using WebApi.Context;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain.Charts;
using Transaction = WebApi.Models.Database.Transaction;

namespace WebApi.Services
{
    public interface IChartingService
    {
        Task<List<NetworthChart>> GetNetworthChart(Guid userId);
    }
    public class ChartingService : IChartingService
    {
        private readonly IUnitOfWork _uow;
        private readonly DbSet<Account> _accounts;
        private readonly DbSet<Transaction> _transactions;
        public ChartingService(IUnitOfWork uow)
        {
            _uow = uow;
            _accounts = _uow.Set<Account>();
            _transactions = _uow.Set<Transaction>();
        }
        public async Task<List<NetworthChart>> GetNetworthChart(Guid userId)
        {
            var charts = new List<NetworthChart>();

            // Construct the chart for 1 week
            
            charts.Add(
                new NetworthChart()
                {
                    Timeframe = "1W",
                    ChartData = await _constructChart(
                        DateTimeOffset.Now.AddDays(-7), DateTimeOffset.Now, TimeSpan.FromDays(1), userId 
                    )
                }
            );
            
            // Construct the chart of 1 year
            charts.Add(
                new NetworthChart()
                {
                    Timeframe = "1Y",
                    ChartData = await _constructChart(
                        DateTimeOffset.Now.AddYears(-1), DateTimeOffset.Now, TimeSpan.FromDays(30), userId 
                    )
                }
            );
            
            // Construct the chart of 5 year
            charts.Add(
                new NetworthChart()
                {
                    Timeframe = "5Y",
                    ChartData = await _constructChart(
                        DateTimeOffset.Now.AddYears(-5), DateTimeOffset.Now, TimeSpan.FromDays(365), userId 
                    )
                }
            );
            
            // Construct the chart for all times
            var firstTransaction = await _getFirstTransaction(userId);
            DateTimeOffset startDate;
            if (firstTransaction.TransactionDate >= DateTimeOffset.Now.AddDays(-365))
            {
                startDate = DateTimeOffset.Now.AddDays(-1825); // 5 Years
            }
            else
            {
                startDate = firstTransaction.TransactionDate;
            }
            charts.Add(
                new NetworthChart()
                {
                    Timeframe = "ALL",
                    ChartData = await _constructChart(
                        startDate, DateTimeOffset.Now, TimeSpan.FromDays(365), userId 
                    )
                }
            );

            return charts;
        }

        private async Task<Transaction> _getFirstTransaction(Guid userId)
        {
            var accounts = await _accounts
                .Where(a => a.UserId == userId)
                .ToListAsync();

            var transactions = new List<Transaction>();

            foreach (var account in accounts)
            {
                transactions.AddRange(await _transactions
                    .Where(t => t.AccountId == account.Id).ToListAsync());
            }

            return transactions.OrderBy(t => t.TransactionDate).FirstOrDefault();
        }

        private async Task<List<NetworthChartData>> _constructChart(DateTimeOffset start, DateTimeOffset end,
            TimeSpan step, Guid userId)
        {
            var accounts = await _accounts
                .Where(a => a.UserId == userId)
                .ToListAsync();

            var transactions = new List<Transaction>();
            var networthChartData = new List<NetworthChartData>();

            foreach (var account in accounts)
            {
                transactions.AddRange(await _transactions
                    .Where(t => t.AccountId == account.Id).ToListAsync());
            }

            bool completed = false;
            DateTimeOffset touched = start;
            double pSum = 0;
            while (!completed)
            {
                var previousSum = transactions.Where(t => t.TransactionDate <= touched).ToList().Sum(t => t.Amount);
                if (pSum == 0)
                {
                    pSum = previousSum;
                }

                var newTransaction = transactions
                    .Where(t => t.TransactionDate >= touched && t.TransactionDate <= touched.Add(step))
                    // .Where(t => t.TransactionDate >= start && t.TransactionDate <= end)
                    .ToList();
                    // .Sum(t => t.Amount);
                var transactionSum = pSum + newTransaction.Sum(t => t.Amount);
                var transactionDate = touched.Add(step);    
                if (transactionSum == previousSum)
                {
                    if (newTransaction.FirstOrDefault() != null)
                    {
                        transactionDate = newTransaction.FirstOrDefault().TransactionDate;
                    }
                    
                }
                var nwcData = new NetworthChartData()
                {
                    Name = transactionDate,
                    Value = transactionSum
                };
                networthChartData.Add(nwcData);
                touched = touched.Add(step);
                pSum = transactionSum;
                if (touched >= end)
                {
                    completed = true;
                }
            }

            return networthChartData.OrderBy(ncd => ncd.Name).ToList();


        }
    }
}