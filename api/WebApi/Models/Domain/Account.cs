﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;

namespace WebApi.Models.Domain
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public AccountType Type { get; set; }
        public List<Transaction> Transactions { get; set; }
        
        public AccountBudget Budget { get; set; }
        
        public AccountPreferences Preferences { get; set; }

        public double AvailableBalance => Transactions?.Sum(transaction => transaction.Amount) ?? 0;
        
        [NotMapped]
        public virtual double ConvertedBalance { get; set; }
        
        public double TotalIncome 
            => Transactions?.Where(transaction => transaction.Amount > 0).Sum(transaction => transaction.Amount) ?? 0;
        public double TotalOutgoings 
            => Transactions?.Where(transaction => transaction.Amount < 0).Sum(transaction => transaction.Amount) ?? 0;
        
        public virtual double ConvertedTotalIncome { get; set; }
        public virtual double ConvertedTotalExpense { get; set; }
        
        public Account(Guid id, string name, AccountType type, Guid userId, List<Transaction> transactions, AccountBudget budget, AccountPreferences preferences)
        {
            Id = id;
            Name = name;
            Type = type;
            UserId = userId;
            Transactions = transactions;
            Budget = budget;
            Preferences = preferences;
        }
    }

    public enum AccountType
    {
        Current = 0,
        Investment = 1,
        Savings = 2,
        CreditCard = 3
    }
}