using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    /// <inheritdoc />
    public partial class Update_TableNames_ToUpperCamelCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_contact_group_AssignedGroupId",
                table: "contact");

            migrationBuilder.DropForeignKey(
                name: "FK_group_project_AssignedProjectId",
                table: "group");

            migrationBuilder.DropForeignKey(
                name: "FK_OwnerContactProject_contact_ProductOwnersId",
                table: "OwnerContactProject");

            migrationBuilder.DropForeignKey(
                name: "FK_OwnerContactProject_project_ManagedProjectsId",
                table: "OwnerContactProject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_project",
                table: "project");

            migrationBuilder.DropPrimaryKey(
                name: "PK_group",
                table: "group");

            migrationBuilder.DropPrimaryKey(
                name: "PK_contact",
                table: "contact");

            migrationBuilder.RenameTable(
                name: "project",
                newName: "Project");

            migrationBuilder.RenameTable(
                name: "group",
                newName: "Group");

            migrationBuilder.RenameTable(
                name: "contact",
                newName: "Contact");

            migrationBuilder.RenameIndex(
                name: "IX_group_AssignedProjectId",
                table: "Group",
                newName: "IX_Group_AssignedProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_contact_AssignedGroupId",
                table: "Contact",
                newName: "IX_Contact_AssignedGroupId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Project",
                table: "Project",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Group",
                table: "Group",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Contact",
                table: "Contact",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contact_Group_AssignedGroupId",
                table: "Contact",
                column: "AssignedGroupId",
                principalTable: "Group",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_Project_AssignedProjectId",
                table: "Group",
                column: "AssignedProjectId",
                principalTable: "Project",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OwnerContactProject_Contact_ProductOwnersId",
                table: "OwnerContactProject",
                column: "ProductOwnersId",
                principalTable: "Contact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OwnerContactProject_Project_ManagedProjectsId",
                table: "OwnerContactProject",
                column: "ManagedProjectsId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contact_Group_AssignedGroupId",
                table: "Contact");

            migrationBuilder.DropForeignKey(
                name: "FK_Group_Project_AssignedProjectId",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK_OwnerContactProject_Contact_ProductOwnersId",
                table: "OwnerContactProject");

            migrationBuilder.DropForeignKey(
                name: "FK_OwnerContactProject_Project_ManagedProjectsId",
                table: "OwnerContactProject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Project",
                table: "Project");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Group",
                table: "Group");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Contact",
                table: "Contact");

            migrationBuilder.RenameTable(
                name: "Project",
                newName: "project");

            migrationBuilder.RenameTable(
                name: "Group",
                newName: "group");

            migrationBuilder.RenameTable(
                name: "Contact",
                newName: "contact");

            migrationBuilder.RenameIndex(
                name: "IX_Group_AssignedProjectId",
                table: "group",
                newName: "IX_group_AssignedProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Contact_AssignedGroupId",
                table: "contact",
                newName: "IX_contact_AssignedGroupId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_project",
                table: "project",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_group",
                table: "group",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_contact",
                table: "contact",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_contact_group_AssignedGroupId",
                table: "contact",
                column: "AssignedGroupId",
                principalTable: "group",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_group_project_AssignedProjectId",
                table: "group",
                column: "AssignedProjectId",
                principalTable: "project",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OwnerContactProject_contact_ProductOwnersId",
                table: "OwnerContactProject",
                column: "ProductOwnersId",
                principalTable: "contact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OwnerContactProject_project_ManagedProjectsId",
                table: "OwnerContactProject",
                column: "ManagedProjectsId",
                principalTable: "project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
