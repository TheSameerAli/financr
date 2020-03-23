﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Context;

namespace WebApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20200319202036_AddRecurringTransactionsLogsTable")]
    partial class AddRecurringTransactionsLogsTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("Financr")
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApi.Models.Database.Account.Account", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<int>("Type");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("WebApi.Models.Database.Account.AccountBudget", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AccountId");

                    b.Property<double>("Budget");

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.HasKey("Id");

                    b.HasIndex("AccountId")
                        .IsUnique();

                    b.ToTable("AccountBudget");
                });

            modelBuilder.Entity("WebApi.Models.Database.Account.AccountCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AccountId");

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("Name");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("AccountCategories");
                });

            modelBuilder.Entity("WebApi.Models.Database.RecurringTransaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AccountCategoryId");

                    b.Property<Guid>("AccountId");

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("Description");

                    b.Property<double>("Income");

                    b.Property<int>("Occurrence");

                    b.Property<DateTimeOffset>("StartDate");

                    b.HasKey("Id");

                    b.HasIndex("AccountCategoryId");

                    b.HasIndex("AccountId");

                    b.ToTable("RecurringTransactions");
                });

            modelBuilder.Entity("WebApi.Models.Database.RecurringTransactionsLog", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<int>("NewTransactionsAdded");

                    b.HasKey("Id");

                    b.ToTable("RecurringTransactionsLogs");
                });

            modelBuilder.Entity("WebApi.Models.Database.Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AccountCategoryId");

                    b.Property<Guid>("AccountId");

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("Description");

                    b.Property<double>("Income");

                    b.Property<DateTimeOffset>("TransactionDate");

                    b.HasKey("Id");

                    b.HasIndex("AccountCategoryId");

                    b.HasIndex("AccountId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("WebApi.Models.Database.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("Email");

                    b.Property<string>("Password");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApi.Models.Database.Account.Account", b =>
                {
                    b.HasOne("WebApi.Models.Database.User", "User")
                        .WithMany("Accounts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebApi.Models.Database.Account.AccountBudget", b =>
                {
                    b.HasOne("WebApi.Models.Database.Account.Account", "Account")
                        .WithOne("Budget")
                        .HasForeignKey("WebApi.Models.Database.Account.AccountBudget", "AccountId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebApi.Models.Database.Account.AccountCategory", b =>
                {
                    b.HasOne("WebApi.Models.Database.Account.Account", "Account")
                        .WithMany("Categories")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebApi.Models.Database.RecurringTransaction", b =>
                {
                    b.HasOne("WebApi.Models.Database.Account.AccountCategory", "AccountCategory")
                        .WithMany()
                        .HasForeignKey("AccountCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebApi.Models.Database.Account.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebApi.Models.Database.Transaction", b =>
                {
                    b.HasOne("WebApi.Models.Database.Account.AccountCategory", "AccountCategory")
                        .WithMany()
                        .HasForeignKey("AccountCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebApi.Models.Database.Account.Account", "Account")
                        .WithMany("Transactions")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
