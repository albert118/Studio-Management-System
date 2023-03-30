using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IGroupRepository
{
    Task<List<Group>> GetGroupsAsync(CancellationToken ct);
    Task<Group?> GetGroupAsync(Guid id, CancellationToken ct);
    Task<Guid> AddGroupAsync(Group group, CancellationToken ct);
    Task<bool> UpdateGroupNameAsync(Guid id, string name, CancellationToken ct);

}
