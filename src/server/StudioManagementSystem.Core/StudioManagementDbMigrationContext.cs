using Microsoft.EntityFrameworkCore;

namespace StudioManagementSystem.Core;

public class StudioManagementDbMigrationContext : DbContext
{
    public StudioManagementDbMigrationContext(DbContextOptions opts) : base(opts) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        // new TestConfig().Configure(builder.Entity<Test>());
    }
}
