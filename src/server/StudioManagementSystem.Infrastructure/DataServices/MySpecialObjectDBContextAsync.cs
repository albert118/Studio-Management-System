using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public class MySpecialObjectDbContextAsync : AsyncDbContext
{
    public MySpecialObjectDbContextAsync(DbContextOptions options) : base(options) { }
    public DbSet<MySpecialObject> MySpecialObjects => Set<MySpecialObject>();
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        new MySpecialObjectConfig().Configure(builder.Entity<MySpecialObject>());
    }
}