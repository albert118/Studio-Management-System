using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;

namespace StudioManagementSystem.ProjectManagement;

public interface IProjectGroupManager
{
    Task<Guid> CreateNewGroupAsync(CreateGroupDto dto, CancellationToken ct);

    Task<List<StudentContact>> GetAllStudentsWithoutGroupsAsync(CancellationToken ct);

    Task<bool> LeaveAssignedGroupAsync(Guid studentContactId, CancellationToken ct);

    Task<bool> RejectGroupApplicationsAsync(List<Guid> ids, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class ProjectGroupManager : IProjectGroupManager
{
    private readonly IGroupRepository _groupRepository;
    private readonly IStudentContactRepository _studentContactRepository;
    private readonly IGroupApplicationRepository _groupApplicationRepository;

    public ProjectGroupManager(IGroupRepository groupRepository, IStudentContactRepository studentContactRepository, IGroupApplicationRepository groupApplicationRepository)
    {
        _groupRepository = groupRepository;
        _studentContactRepository = studentContactRepository;
        _groupApplicationRepository = groupApplicationRepository;
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

    public async Task<List<StudentContact>> GetAllStudentsWithoutGroupsAsync(CancellationToken ct)
    {
        var students = await _studentContactRepository.GetAllStudentsAsync(ct);
        return students.Where(e=>e.AssignedGroupId == null).ToList();
    }

    public async Task<bool> LeaveAssignedGroupAsync(Guid studentContactId, CancellationToken ct)
    {
        return await _studentContactRepository.RemoveAssignedGroupAsync(studentContactId, ct);
    }

    public async Task<bool> RejectGroupApplicationsAsync(List<Guid> ids, CancellationToken ct)
    {
        if (!ids.Any()) {
            return true;
        }

        return await _groupApplicationRepository.RemoveGroupApplicationsAsync(ids, ct);
    }
}
