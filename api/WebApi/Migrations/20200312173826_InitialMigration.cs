using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Financr_Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Financr_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Financr_Accounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Financr_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Financr_Accounts_Financr_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Financr_Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Financr_AccountCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    AccountId = table.Column<Guid>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Financr_AccountCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Financr_AccountCategories_Financr_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Financr_Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Financr_Transactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Income = table.Column<double>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    AccountId = table.Column<Guid>(nullable: false),
                    TransactionDate = table.Column<DateTimeOffset>(nullable: false),
                    AccountCategoryId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Financr_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Financr_Transactions_Financr_AccountCategories_AccountCategoryId",
                        column: x => x.AccountCategoryId,
                        principalTable: "Financr_AccountCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Financr_Transactions_Financr_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Financr_Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Financr_AccountCategories_AccountId",
                table: "Financr_AccountCategories",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Financr_Accounts_UserId",
                table: "Financr_Accounts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Financr_Transactions_AccountCategoryId",
                table: "Financr_Transactions",
                column: "AccountCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Financr_Transactions_AccountId",
                table: "Financr_Transactions",
                column: "AccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Financr_Transactions");

            migrationBuilder.DropTable(
                name: "Financr_AccountCategories");

            migrationBuilder.DropTable(
                name: "Financr_Accounts");

            migrationBuilder.DropTable(
                name: "Financr_Users");
        }
    }
}
