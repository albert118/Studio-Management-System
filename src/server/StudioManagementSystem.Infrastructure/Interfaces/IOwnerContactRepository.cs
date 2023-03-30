using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces;

public interface IOwnerContactRepository
{
    Task<List<OwnerContact>> GetOwnersByIdAsync(IEnumerable<Guid> ownerContactIds, CancellationToken ct);
}
