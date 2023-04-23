using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;

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

        var groupProjectPreferences = dto.Preferences
            .PreferencesAsList()
            .Select(GroupProjectPreferenceMapper.MapToGroupProjectPreference)
            .ToList();

        if (group != null) {
            await _groupRepository.AddGroupProjectPreferencesAsync(groupProjectPreferences, group, ct);
        }

        return groupId;
    }
}
