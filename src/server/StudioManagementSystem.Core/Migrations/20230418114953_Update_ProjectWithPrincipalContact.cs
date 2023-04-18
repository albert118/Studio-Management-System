using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    /// <inheritdoc />
    public partial class Update_ProjectWithPrincipalContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PrincipalOwnerId",
                table: "Project",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Project_PrincipalOwnerId",
                table: "Project",
                column: "PrincipalOwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Contact_PrincipalOwnerId",
                table: "Project",
                column: "PrincipalOwnerId",
                principalTable: "Contact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Contact_PrincipalOwnerId",
                table: "Project");

            migrationBuilder.DropIndex(
                name: "IX_Project_PrincipalOwnerId",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "PrincipalOwnerId",
                table: "Project");
        }
    }
}
