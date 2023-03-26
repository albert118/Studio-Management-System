using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.DataServices;

public class StudioManagementSystemDbContextAsync : AsyncDbContext
{
    public StudioManagementSystemDbContextAsync(DbContextOptions options) : base(options) { }

    public DbSet<MySpecialObject> MySpecialObjects => Set<MySpecialObject>();

    public DbSet<Contact> Contacts => Set<Contact>();

    public DbSet<Group> Groups => Set<Group>();

    public DbSet<Project> Projects => Set<Project>();
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        new MySpecialObjectConfig().Configure(builder.Entity<MySpecialObject>());

        new ContactConfig().Configure(builder.Entity<Contact>());

        new GroupConfig().Configure(builder.Entity<Group>());

        new ProjectConfig().Configure(builder.Entity<Project>());
    }
}