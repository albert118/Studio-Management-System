using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Core;

public class StudioManagementDbMigrationContext : DbContext
{
    public StudioManagementDbMigrationContext(DbContextOptions opts) : base(opts) { }
    public DbSet<MySpecialObject> MySpecialObjects => Set<MySpecialObject>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Group> Groups => Set<Group>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        new MySpecialObjectConfig().Configure(builder.Entity<MySpecialObject>());

        new ContactConfig().Configure(builder.Entity<Contact>());

        new GroupConfig().Configure(builder.Entity<Group>());
    }
}
