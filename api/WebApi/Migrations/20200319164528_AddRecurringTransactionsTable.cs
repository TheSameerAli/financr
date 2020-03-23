using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class AddRecurringTransactionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecurringTransactions",
                schema: "Financr",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    StartDate = table.Column<DateTimeOffset>(nullable: false),
                    Occurrence = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Income = table.Column<double>(nullable: false),
                    AccountCategoryId = table.Column<Guid>(nullable: false),
                    AccountId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecurringTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecurringTransactions_AccountCategories_AccountCategoryId",
                        column: x => x.AccountCategoryId,
                        principalSchema: "Financr",
                        principalTable: "AccountCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecurringTransactions_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "Financr",
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecurringTransactions_AccountCategoryId",
                schema: "Financr",
                table: "RecurringTransactions",
                column: "AccountCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_RecurringTransactions_AccountId",
                schema: "Financr",
                table: "RecurringTransactions",
                column: "AccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecurringTransactions",
                schema: "Financr");
        }
    }
}
