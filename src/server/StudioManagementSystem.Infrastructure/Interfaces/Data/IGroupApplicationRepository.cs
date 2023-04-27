using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IGroupApplicationRepository
{
    Task<bool> AddGroupApplication(InvitationDto dto, CancellationToken ct);

    Task<List<GroupApplication>> GetGroupApplicationAsync(Guid groupId, CancellationToken ct);

    Task<List<GroupApplication>> GetGroupApplicationsByStudentIdsAsync(List<Guid> studentIds, CancellationToken ct);
}
