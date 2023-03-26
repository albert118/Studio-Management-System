using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.DataServices;

public interface IGroupRepositoryAsync
{
    Task<List<Group>> GetGroupsAsync(CancellationToken ct);
    Task<Group?> GetGroupAsync(Guid id, CancellationToken ct);
    Task<Guid> AddGroupAsync(Group group, CancellationToken ct);
    Task<Group?> UpdateGroupAsync(Guid id, Group group, CancellationToken ct);

}