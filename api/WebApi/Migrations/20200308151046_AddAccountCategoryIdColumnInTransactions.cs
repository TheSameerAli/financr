using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class AddAccountCategoryIdColumnInTransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AccountCategoryId",
                table: "Transactions",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountCategoryId",
                table: "Transactions",
                column: "AccountCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_AccountCategories_AccountCategoryId",
                table: "Transactions",
                column: "AccountCategoryId",
                principalTable: "AccountCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_AccountCategories_AccountCategoryId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_AccountCategoryId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "AccountCategoryId",
                table: "Transactions");
        }
    }
}
