using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class AddAccountPreferencesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.CreateTable(
                name: "AccountPreferences",
                schema: "Financr",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Currency = table.Column<string>(nullable: true),
                    AccountId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountPreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountPreferences_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "Financr",
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountPreferences_AccountId",
                schema: "Financr",
                table: "AccountPreferences",
                column: "AccountId",
                unique: true);
            
            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountPreferences",
                schema: "Financr");
        }
    }
}
