using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Models.Database;

namespace WebApi.Models.Domain
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public AccountType Type { get; set; }
        public List<Transaction> Transactions { get; set; }

        public double AvailableBalance => Transactions.Sum(transaction => transaction.Income);
        public double TotalIncome 
            => Transactions.Where(transaction => transaction.Income > 0).Sum(transaction => transaction.Income);
        public double TotalOutgoings 
            => Transactions.Where(transaction => transaction.Income < 0).Sum(transaction => transaction.Income);

        public Account(Guid id, string name, AccountType type, Guid userId, List<Transaction> transactions)
        {
            Id = id;
            Name = name;
            Type = type;
            UserId = userId;
            Transactions = transactions;
        }
    }

    public enum AccountType
    {
        Current = 0,
        Business = 1,
        Savings = 2,
        CreditCard = 3
    }
}