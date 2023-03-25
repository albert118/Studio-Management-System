﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StudioManagementSystem.Core;

#nullable disable

namespace StudioManagementSystem.Core.Migrations
{
    [DbContext(typeof(StudioManagementDbMigrationContext))]
    partial class StudioManagementDbMigrationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("OwnerContactProject", b =>
                {
                    b.Property<Guid>("ManagedProjectsId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("ProductOwnersId")
                        .HasColumnType("char(36)");

                    b.HasKey("ManagedProjectsId", "ProductOwnersId");

                    b.HasIndex("ProductOwnersId");

                    b.ToTable("OwnerContactProject");
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.Contact", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(true);

                    b.Property<bool>("IsArchived")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("contact_type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("contact", (string)null);

                    b.HasDiscriminator<string>("contact_type").HasValue("Contact");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.Group", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid?>("AssignedProjectId")
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsArchived")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<bool>("IsLocked")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("AssignedProjectId");

                    b.ToTable("group", (string)null);
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

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.Project", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsArchived")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<bool>("IsLocked")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("project", (string)null);
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

                    b.Property<Guid?>("AssignedGroupId")
                        .HasColumnType("char(36)");

                    b.HasIndex("AssignedGroupId");

                    b.HasDiscriminator().HasValue("studentcontact");
                });

            modelBuilder.Entity("OwnerContactProject", b =>
                {
                    b.HasOne("StudioManagementSystem.Core.Entities.Project", null)
                        .WithMany()
                        .HasForeignKey("ManagedProjectsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StudioManagementSystem.Core.Entities.OwnerContact", null)
                        .WithMany()
                        .HasForeignKey("ProductOwnersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.Group", b =>
                {
                    b.HasOne("StudioManagementSystem.Core.Entities.Project", "AssignedProject")
                        .WithMany("AssignedGroups")
                        .HasForeignKey("AssignedProjectId");

                    b.Navigation("AssignedProject");
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.StudentContact", b =>
                {
                    b.HasOne("StudioManagementSystem.Core.Entities.Group", "AssignedGroup")
                        .WithMany()
                        .HasForeignKey("AssignedGroupId");

                    b.Navigation("AssignedGroup");
                });

            modelBuilder.Entity("StudioManagementSystem.Core.Entities.Project", b =>
                {
                    b.Navigation("AssignedGroups");
                });
#pragma warning restore 612, 618
        }
    }
}
