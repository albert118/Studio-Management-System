﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StudioManagementSystem.Core;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    [DbContext(typeof(StudioManagementDbMigrationContext))]
    [Migration("20230325055242_Adds_ContactWithSubClassing_TPH_Pattern")]
    partial class Adds_ContactWithSubClassing_TPH_Pattern
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.Contact", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValue(new DateTime(2023, 3, 25, 5, 52, 42, 325, DateTimeKind.Utc).AddTicks(8026));

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<bool>("IsArchived")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedOn")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValue(new DateTime(2023, 3, 25, 5, 52, 42, 325, DateTimeKind.Utc).AddTicks(7858));

                    b.Property<string>("contact_type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("contact", (string)null);

                    b.HasDiscriminator<string>("contact_type").HasValue("Contact");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.MySpecialObject", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("SpecialField")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("MySpecialObject", (string)null);
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.OwnerContact", b =>
                {
                    b.HasBaseType("StudioManagementSystem.Core.Entities.Contact");

                    b.Property<string>("StudioSection")
                        .HasColumnType("longtext");

                    b.HasDiscriminator().HasValue("ownercontact");
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.StudentContact", b =>
                {
                    b.HasBaseType("StudioManagementSystem.Core.Entities.Contact");

                    b.HasDiscriminator().HasValue("studentcontact");
                });
#pragma warning restore 612, 618
        }
    }
}
