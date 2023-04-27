using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class OwnerContactRepository : IOwnerContactRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;

    public OwnerContactRepository(IStudioManagementSystemDbContextAsync smsDbContext)
    {
        _smsDbContext = smsDbContext;
    }

    public async Task<List<OwnerContact>> GetAllOwnersAsync(CancellationToken ct)
    {
        var owners = await _smsDbContext.OwnerContacts.ToListAsync(ct);
        return owners;
    }

    public async Task<List<OwnerContact>> GetOwnersByIdAsync(IEnumerable<Guid> ownerContactIds, CancellationToken ct)
    {
        var owners = await _smsDbContext.OwnerContacts.Where(c => ownerContactIds.Contains(c.Id)).ToListAsync(ct);
        return owners;
    }

    public async Task<Guid> AddOwnerContactAsync(OwnerContact ownerContact, CancellationToken ct)
    {
        await _smsDbContext.OwnerContacts.AddAsync(ownerContact, ct);
        await _smsDbContext.SaveChangesAsync(ct);
        return ownerContact.Id;
    }
}
