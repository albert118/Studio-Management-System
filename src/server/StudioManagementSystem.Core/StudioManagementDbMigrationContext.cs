using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Core;

public class StudioManagementDbMigrationContext : DbContext
{
    public StudioManagementDbMigrationContext(DbContextOptions opts) : base(opts) { }

    public DbSet<Contact> Contacts => Set<Contact>();

    public DbSet<Group> Groups => Set<Group>();

    public DbSet<Project> Projects => Set<Project>();

    public DbSet<GroupProjectPreference> GroupProjectPreferences => Set<GroupProjectPreference>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        new ContactConfig().Configure(builder.Entity<Contact>());

        new GroupConfig().Configure(builder.Entity<Group>());

        new ProjectConfig().Configure(builder.Entity<Project>());

        new GroupProjectPreferenceConfig().Configure(builder.Entity<GroupProjectPreference>());
    }
}
