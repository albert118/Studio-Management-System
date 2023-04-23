using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IGroupRepository
{
    Task<List<Group>> GetGroupsAsync(CancellationToken ct);
    Task<Group?> GetGroupAsync(Guid id, CancellationToken ct);
    Task<Group?> GetGroupByNameAsync(string name, CancellationToken ct);
    Task<Guid> AddGroupAsync(Group group, CancellationToken ct);
    Task<bool> UpdateGroup(Guid id, Group updatedGroup, CancellationToken ct);
    Task<bool> AddGroupProjectPreferencesAsync(List<GroupProjectPreference> preferences, Group group, CancellationToken ct);
}
