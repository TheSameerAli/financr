﻿using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.TestHost;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Models.Database.Account;
using WebApi.Models.Domain;
using WebApi.Services;
using Account = WebApi.Models.Database.Account.Account;
using User = WebApi.Models.Database.User;

namespace Tests.Unit
{
    public class TestHelpers
    {
        private ApplicationDbContext _context;
        private TestServer _server;

        public TestHelpers(ApplicationDbContext context, TestServer server)
        {
            _context = context;
            _server = server;
        }

        public async Task<User> CreateUser(string email, string password)
        {
            var userService = GetService<IUserService>();
            var user = await userService.Create(email, password);
            return user;
        }

        public async Task<Account> CreateAccount(string name, AccountType type, Guid userId, string currency = "GBP")
        {
            var account = new Account(name, type, userId);
            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();
            var preferences = new AccountPreferences(currency, account.Id);
            await _context.AccountPreferences.AddAsync(preferences);
            await _context.SaveChangesAsync();
            return account;
        }

        public async Task<Transaction> CreateTransaction(double amount, string description, Guid accountCategoryId,
            Guid accountId)
        {
            var transaction = new Transaction(amount, description, DateTimeOffset.Now, accountCategoryId, accountId);
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<AccountCategory> CreateAccountCategory(string name, AccountCategoryType type, Guid accountId)
        {
            var accountCategory = new AccountCategory(name, type, accountId);
            await _context.AccountCategories.AddAsync(accountCategory);
            await _context.SaveChangesAsync();
            return accountCategory;
        }

        public async Task<TransactionNote> CreateTransactionNote(string note, Guid transactionId)
        {
            var transactionNote = new TransactionNote(note, transactionId);
            await _context.TransactionNotes.AddAsync(transactionNote);
            await _context.SaveChangesAsync();
            return transactionNote;
        }
        
        public T GetService<T>()
        {
            return (T)_server.Host.Services.GetService(typeof(T));
        }

        public HttpContent MakePayload(dynamic obj)
        {
            string jsonNewAnswer = JsonConvert.SerializeObject(obj,  Formatting.Indented,
                new JsonSerializerSettings {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            HttpContent payload = new StringContent(jsonNewAnswer, Encoding.UTF8, "application/json");
            return payload;
        }
    }
}