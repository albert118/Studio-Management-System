using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Core;

public class StudioManagementDbMigrationContext : DbContext
{
    public StudioManagementDbMigrationContext(DbContextOptions opts) : base(opts) { }

    public DbSet<Contact> Contacts => Set<Contact>();

    public DbSet<Group> Groups => Set<Group>();

    public DbSet<Project> Projects => Set<Project>();

    public DbSet<ProjectPreference> ProjectPreferences => Set<ProjectPreference>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        new ContactConfig().Configure(builder.Entity<Contact>());

        new GroupConfig().Configure(builder.Entity<Group>());

        new ProjectConfig().Configure(builder.Entity<Project>());

        new ProjectPreferenceConfig().Configure(builder.Entity<ProjectPreference>());
    }
}
