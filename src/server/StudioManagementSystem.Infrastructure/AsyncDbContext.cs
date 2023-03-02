using Microsoft.EntityFrameworkCore;

namespace StudioManagementSystem.Infrastructure;

public abstract class AsyncDbContext : DbContext
{
    protected AsyncDbContext(DbContextOptions options) : base(options) { }

    public override int SaveChanges(bool _) => SaveChanges();

    public override int SaveChanges() => throw new NotSupportedException("Async is preferred over sync calls");

    public override Task<int> SaveChangesAsync(CancellationToken ct = default) => SaveChangesAsync(true, ct);

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken ct = default)
    {
        if (ct == default)
        {
            throw new InvalidOperationException(
                $"A cancellation token is required when using {nameof(AsyncDbContext)} async methods to allow operation termination mid-process");
        }

        return await base.SaveChangesAsync(acceptAllChangesOnSuccess, ct);
    }
}
