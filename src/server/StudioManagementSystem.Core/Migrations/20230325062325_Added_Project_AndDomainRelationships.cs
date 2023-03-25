using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    /// <inheritdoc />
    public partial class Added_Project_AndDomainRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedOn",
                table: "contact",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldDefaultValue: new DateTime(2023, 3, 25, 5, 52, 42, 325, DateTimeKind.Utc).AddTicks(7858));

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "contact",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedOn",
                table: "contact",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldDefaultValue: new DateTime(2023, 3, 25, 5, 52, 42, 325, DateTimeKind.Utc).AddTicks(8026));

            migrationBuilder.AddColumn<Guid>(
                name: "AssignedGroupId",
                table: "contact",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsArchived = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsLocked = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "group",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    AssignedProjectId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsArchived = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValue: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsLocked = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_group", x => x.Id);
                    table.ForeignKey(
                        name: "FK_group_Project_AssignedProjectId",
                        column: x => x.AssignedProjectId,
                        principalTable: "Project",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OwnerContactProject",
                columns: table => new
                {
                    ManagedProjectsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ProductOwnersId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnerContactProject", x => new { x.ManagedProjectsId, x.ProductOwnersId });
                    table.ForeignKey(
                        name: "FK_OwnerContactProject_Project_ManagedProjectsId",
                        column: x => x.ManagedProjectsId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OwnerContactProject_contact_ProductOwnersId",
                        column: x => x.ProductOwnersId,
                        principalTable: "contact",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_contact_AssignedGroupId",
                table: "contact",
                column: "AssignedGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_group_AssignedProjectId",
                table: "group",
                column: "AssignedProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_OwnerContactProject_ProductOwnersId",
                table: "OwnerContactProject",
                column: "ProductOwnersId");

            migrationBuilder.AddForeignKey(
                name: "FK_contact_group_AssignedGroupId",
                table: "contact",
                column: "AssignedGroupId",
                principalTable: "group",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_contact_group_AssignedGroupId",
                table: "contact");

            migrationBuilder.DropTable(
                name: "group");

            migrationBuilder.DropTable(
                name: "OwnerContactProject");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropIndex(
                name: "IX_contact_AssignedGroupId",
                table: "contact");

            migrationBuilder.DropColumn(
                name: "AssignedGroupId",
                table: "contact");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedOn",
                table: "contact",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(2023, 3, 25, 5, 52, 42, 325, DateTimeKind.Utc).AddTicks(7858),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "contact",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)",
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedOn",
                table: "contact",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(2023, 3, 25, 5, 52, 42, 325, DateTimeKind.Utc).AddTicks(8026),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");
        }
    }
}
