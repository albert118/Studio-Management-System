using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IOwnerContactRepository
{
    Task<List<OwnerContact>> GetAllOwnersAsync(CancellationToken ct);
    Task<List<OwnerContact>> GetOwnersByIdAsync(IEnumerable<Guid> ownerContactIds, CancellationToken ct);
    Task<Guid> AddOwnerContactAsync(OwnerContact ownerContact, CancellationToken ct);
}
