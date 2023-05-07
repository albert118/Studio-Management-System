using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IGroupApplicationRepository
{
    Task<bool> AddGroupApplication(InvitationDto dto, CancellationToken ct);

    Task<List<GroupApplication>> GetGroupApplicationsAsync(Guid groupId, CancellationToken ct);
    Task<bool> RemoveGroupApplicationsAsync(List<Guid> ids, CancellationToken ct);

    Task<List<GroupApplication>> GetGroupApplicationsByStudentIdsAsync(List<Guid> studentIds, CancellationToken ct);
}
