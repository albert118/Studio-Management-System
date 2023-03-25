using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    /// <inheritdoc />
    public partial class Added_ProjectToDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_group_Project_AssignedProjectId",
                table: "group");

            migrationBuilder.DropForeignKey(
                name: "FK_OwnerContactProject_Project_ManagedProjectsId",
                table: "OwnerContactProject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Project",
                table: "Project");

            migrationBuilder.RenameTable(
                name: "Project",
                newName: "project");

            migrationBuilder.AlterColumn<bool>(
                name: "IsLocked",
                table: "project",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<bool>(
                name: "IsArchived",
                table: "project",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_project",
                table: "project",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_group_project_AssignedProjectId",
                table: "group",
                column: "AssignedProjectId",
                principalTable: "project",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OwnerContactProject_project_ManagedProjectsId",
                table: "OwnerContactProject",
                column: "ManagedProjectsId",
                principalTable: "project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_group_project_AssignedProjectId",
                table: "group");

            migrationBuilder.DropForeignKey(
                name: "FK_OwnerContactProject_project_ManagedProjectsId",
                table: "OwnerContactProject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_project",
                table: "project");

            migrationBuilder.RenameTable(
                name: "project",
                newName: "Project");

            migrationBuilder.AlterColumn<bool>(
                name: "IsLocked",
                table: "Project",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsArchived",
                table: "Project",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)",
                oldDefaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Project",
                table: "Project",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_group_Project_AssignedProjectId",
                table: "group",
                column: "AssignedProjectId",
                principalTable: "Project",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OwnerContactProject_Project_ManagedProjectsId",
                table: "OwnerContactProject",
                column: "ManagedProjectsId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
