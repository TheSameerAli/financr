﻿using Microsoft.EntityFrameworkCore;
 using Microsoft.EntityFrameworkCore.Metadata;
 using WebApi.Models.Database;
 using WebApi.Models.Database.Account;

 namespace WebApi.Context
{
    public class ApplicationDbContext : DbContext, IUnitOfWork
    {
        public DbSet<User> Users { get; set; } 
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<AccountCategory> AccountCategories { get; set; }
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        /**
         * Method is used to define properties
         * of entity models used by application
         */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Financr");

            #region User
            modelBuilder.Entity<User>(o =>
            {
                o.HasMany(u => u.Accounts);
            });
            #endregion

            #region Account
            modelBuilder.Entity<Account>(o =>
            {
                o.HasMany(a => a.Transactions);
                o.HasMany(a => a.Categories);
                o.HasOne(a => a.User);
                o.HasOne(a => a.Budget);
            });
            #endregion
            
            #region Account
            modelBuilder.Entity<AccountCategory>(o =>
            {
                o.HasOne(ac => ac.Account);
                
            });
            #endregion
            
            #region AccountBudget
            modelBuilder.Entity<AccountBudget>(o =>
            {
                o.HasOne(ab => ab.Account);
                
            });
            #endregion
            
            #region Transaction
            modelBuilder.Entity<Transaction>(o =>
            {
                o.HasOne(a => a.Account);
                o.HasOne(t => t.AccountCategory);
            });
            #endregion
        }
    }
}