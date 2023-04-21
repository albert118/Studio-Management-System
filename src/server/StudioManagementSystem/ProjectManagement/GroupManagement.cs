using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.ProjectManagement;

public interface IProjectGroupManager
{
    Task<Guid> CreateNewGroupAsync(CreateGroupDto dto, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class ProjectGroupManager : IProjectGroupManager
{
    private readonly IGroupRepository _groupRepository;

    public ProjectGroupManager(IGroupRepository groupRepository)
    {
        _groupRepository = groupRepository;
    }

    public async Task<Guid> CreateNewGroupAsync(CreateGroupDto dto, CancellationToken ct)
    {
        var groupId = await _groupRepository.AddGroupAsync(new(dto), ct);
        var group = await _groupRepository.GetGroupAsync(groupId, ct);

        var groupProjectPreferences = dto.Preferences?
            .Where(kvp => kvp.Key != Guid.Empty)
            .Select(kvp => new GroupProjectPreference(kvp))
            .ToList();

        if (groupProjectPreferences != null && group != null) {
            await _groupRepository.AddGroupProjectPreferencesAsync(groupProjectPreferences, group, ct);
        }

        return groupId;
    }
}
