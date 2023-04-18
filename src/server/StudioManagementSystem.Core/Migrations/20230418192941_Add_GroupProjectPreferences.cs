using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    /// <inheritdoc />
    public partial class Add_GroupProjectPreferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupProjectPreference",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Rank = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    GroupId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupProjectPreference", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupProjectPreference_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupProjectPreference_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_GroupProjectPreference_GroupId",
                table: "GroupProjectPreference",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupProjectPreference_ProjectId",
                table: "GroupProjectPreference",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupProjectPreference");
        }
    }
}
