using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.ProjectManagement;

public interface IGroupManager
{
    
    Task<List<StudentContact>> GetAllStudentsWithNoGroupsAsync(CancellationToken ct);
    Task<Guid> LeaveAssignedGroupAsync(Guid id, CancellationToken ct);
    Task<bool> RejectGroupApplicationAsync(List<Guid> ids, CancellationToken ct);
}
[InstanceScopedBusinessService]
public class GroupManager: IGroupManager
{
    private readonly IStudentContactRepository _studentContactRepository;
    private readonly IGroupApplicationRepository _groupApplicationRepository;

    public GroupManager(IStudentContactRepository studentContactRepository, IGroupApplicationRepository groupApplicationRepository)
    {
        _studentContactRepository = studentContactRepository;
        _groupApplicationRepository = groupApplicationRepository;
    }
    
    public async Task<List<StudentContact>> GetAllStudentsWithNoGroupsAsync(CancellationToken ct)
    {
        List<StudentContact> students = await _studentContactRepository.GetAllStudentsAsync(ct);
        return students.Where(e=>e.AssignedGroupId == null).ToList();
    }

    public async Task<Guid> LeaveAssignedGroupAsync(Guid id, CancellationToken ct)
    {
        return await _studentContactRepository.RemoveAssignedGroupAsync(id, ct);
    }

    public async Task<bool> RejectGroupApplicationAsync(List<Guid> ids, CancellationToken ct)
    {
        return await _groupApplicationRepository.RemoveGroupApplicationsAsync(ids, ct);
    }
}