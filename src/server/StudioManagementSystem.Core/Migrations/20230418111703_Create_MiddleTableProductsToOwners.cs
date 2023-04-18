using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    /// <inheritdoc />
    public partial class Create_MiddleTableProductsToOwners : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // this table never existed, so comment out to  fix the migration error
            // migrationBuilder.DropTable(
            //     name: "OwnerContactProject");

            migrationBuilder.CreateTable(
                name: "ProductOwnersToManagedProducts",
                columns: table => new
                {
                    ManagedProductsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ProductOwnersId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOwnersToManagedProducts", x => new { x.ManagedProductsId, x.ProductOwnersId });
                    table.ForeignKey(
                        name: "FK_ProductOwnersToManagedProducts_Contact_ProductOwnersId",
                        column: x => x.ProductOwnersId,
                        principalTable: "Contact",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductOwnersToManagedProducts_Project_ManagedProductsId",
                        column: x => x.ManagedProductsId,
                        principalTable: "Project",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOwnersToManagedProducts_ProductOwnersId",
                table: "ProductOwnersToManagedProducts",
                column: "ProductOwnersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductOwnersToManagedProducts");

            // this table never existed, so comment out to  fix the migration error
            // migrationBuilder.CreateTable(
            //     name: "OwnerContactProject",
            //     columns: table => new
            //     {
            //         ManagedProjectsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
            //         ProductOwnersId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_OwnerContactProject", x => new { x.ManagedProjectsId, x.ProductOwnersId });
            //         table.ForeignKey(
            //             name: "FK_OwnerContactProject_Contact_ProductOwnersId",
            //             column: x => x.ProductOwnersId,
            //             principalTable: "Contact",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_OwnerContactProject_Project_ManagedProjectsId",
            //             column: x => x.ManagedProjectsId,
            //             principalTable: "Project",
            //             principalColumn: "Id",
            //             onDelete: ReferentialAction.Cascade);
            //     })
            //     .Annotation("MySql:CharSet", "utf8mb4");
            //
            // migrationBuilder.CreateIndex(
            //     name: "IX_OwnerContactProject_ProductOwnersId",
            //     table: "OwnerContactProject",
            //     column: "ProductOwnersId");
        }
    }
}
