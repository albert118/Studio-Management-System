using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class OwnerContactRepository : IOwnerContactRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    private readonly ILogger<OwnerContactRepository> _logger;

    public OwnerContactRepository(IStudioManagementSystemDbContextAsync smsDbContext, ILogger<OwnerContactRepository> logger)
    {
        _smsDbContext = smsDbContext;
        _logger = logger;
    }

    public Task<List<OwnerContact>> GetOwnersByIdAsync(IEnumerable<Guid> ownerContactIds, CancellationToken ct)
    {
        var owners = _smsDbContext.OwnerContacts.Where(c => ownerContactIds.Contains(c.Id)).ToListAsync(ct);
        return owners;
    }

    public async Task<Guid> AddOwnerContactAsync(OwnerContact ownerContact, CancellationToken ct)
    {
        await _smsDbContext.OwnerContacts.AddAsync(ownerContact, ct);
        await _smsDbContext.SaveChangesAsync(ct);
        return ownerContact.Id;
    }
}
