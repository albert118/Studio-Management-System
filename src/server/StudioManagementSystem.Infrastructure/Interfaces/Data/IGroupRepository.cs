using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.DataServices;

public interface IGroupRepository
{
    Task<List<Group>> GetGroupsAsync(CancellationToken ct);
    Task<Group?> GetGroupAsync(Guid id, CancellationToken ct);
    Task<Guid> AddGroupAsync(Group group, CancellationToken ct);
    Task<Group?> UpdateGroupNameAsync(Guid id, string name, CancellationToken ct);

}
