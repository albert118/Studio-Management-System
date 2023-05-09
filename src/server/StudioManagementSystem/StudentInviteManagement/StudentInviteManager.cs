using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.StudentInviteManagement;

public interface IStudentInviteManager
{
    Task<Guid?> AcceptInviteForStudent(Guid inviteId, CancellationToken ct);

    Task<bool> RejectInvitesForStudent(List<Guid> inviteIds, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class StudentInviteManager : IStudentInviteManager
{
    private readonly ILogger<StudentInviteManager> _logger;
    private readonly IGroupApplicationRepository _groupApplicationRepository;
    private readonly IStudentContactRepository _studentContactRepository;

    public StudentInviteManager(ILogger<StudentInviteManager> logger, IGroupApplicationRepository groupApplicationRepository, IStudentContactRepository studentContactRepository)
    {
        _logger = logger;
        _groupApplicationRepository = groupApplicationRepository;
        _studentContactRepository = studentContactRepository;
    }

    public async Task<Guid?> AcceptInviteForStudent(Guid inviteId, CancellationToken ct)
    {
        var groupApplication = (await _groupApplicationRepository.GetGroupApplicationsByIdsAsync(new() { inviteId }, ct)).FirstOrDefault();

        if (groupApplication == null) {
            _logger.LogError("Cannot accept {GroupApplication} with ID: {InviteId}, as one wasn't was found",
                inviteId,
                nameof(GroupApplication)
            );

            return null;
        }

        if (await _studentContactRepository.AssignStudentToGroupAsync(groupApplication.StudentContactId, groupApplication.GroupId, ct)) {
            _logger.LogError("Error while assigning {StudentContact} {StudentContactId} to {Group} {GroupId}",
                nameof(StudentContact),
                groupApplication.StudentContactId,
                nameof(Group),
                groupApplication.GroupId
            );

            await _groupApplicationRepository.RemoveGroupApplicationsAsync(new() { groupApplication.Id }, ct);
            return groupApplication.GroupId;
        }

        return null;
    }

    public async Task<bool> RejectInvitesForStudent(List<Guid> inviteIds, CancellationToken ct)
    {
        await _groupApplicationRepository.RemoveGroupApplicationsAsync(inviteIds, ct);
        return true;
    }
}
