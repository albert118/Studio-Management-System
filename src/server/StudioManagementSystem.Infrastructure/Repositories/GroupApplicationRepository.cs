using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using System.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class GroupApplicationRepository: IGroupApplicationRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    private readonly ILogger<GroupApplicationRepository> _logger;

    public GroupApplicationRepository(IStudioManagementSystemDbContextAsync smsDbContext, ILogger<GroupApplicationRepository> logger)
    {
        _smsDbContext = smsDbContext;
        _logger = logger;
    }
    
    public async Task<bool> AddGroupApplication(InvitationDto dto, CancellationToken ct)
    {
        var existingApplicationsForStudents = await GetGroupApplicationsByStudentIdsAndGroupIdAsync(dto.StudentIds.ToList(), dto.GroupId, ct);

        if (existingApplicationsForStudents.Count > 0) {
            var num = existingApplicationsForStudents.Count;
            var plural = existingApplicationsForStudents.Count > 1 ? "s": string.Empty;
            var names = string.Join(", ", existingApplicationsForStudents.Select(app => app.StudentContact.GetFullName()));
            throw new DataException($"Cannot create a new application as {num} student{plural} have already been invited. Please remove {names} from the application if you would like to try again");
        }

        var groupApplications = dto.StudentIds
            .Select(studentId => new GroupApplication {StudentContactId = studentId, GroupId = dto.GroupId, Message = dto.Message})
            .ToList();

        try {
            await _smsDbContext.GroupApplications.AddRangeAsync(groupApplications, ct);
            await _smsDbContext.SaveChangesAsync(ct);
        }catch (Exception ex) {
            _logger.LogError(ex, "An exception occured while adding {StudentContact}s to a {GroupApplication}",
                nameof(GroupApplication),
                nameof(StudentContact)
            );
            return false;
        }

        return true;
    }

    public async Task<List<GroupApplication>> GetGroupApplicationsByIdsAsync(List<Guid> applicationIds,
    CancellationToken ct)
    {
        var groupApplicationsForStudent = await _smsDbContext.GroupApplications
            .Where(e => applicationIds.Contains(e.Id))
            .ToListAsync(ct);

        return groupApplicationsForStudent;
    }

    public async Task<List<GroupApplication>> GetGroupApplicationsForStudentAsync(Guid studentId, CancellationToken ct)
    {
        var groupApplicationsForStudent = await _smsDbContext.GroupApplications
            .Where(e => e.StudentContactId == studentId)
            .Include(e => e.Group)
            .ToListAsync(ct);

        return groupApplicationsForStudent;
    }

    public async Task<bool> RemoveGroupApplicationsAsync(List<Guid> ids, CancellationToken ct)
    {
        var returnValue = false;

        try {
            var applications = await GetGroupApplicationsByIdAsync(ids, ct);
            _smsDbContext.GroupApplications.RemoveRange(applications);
            await _smsDbContext.SaveChangesAsync(ct);

            returnValue = true;
        } catch (Exception ex) {
            _logger.LogError(ex, "An exception occured while removing {GroupApplication}",
                nameof(GroupApplication)
            );
        }

        return returnValue;
    }
    
    public async Task<List<GroupApplication>> GetGroupApplicationsByIdAsync(IEnumerable<Guid> ids, CancellationToken ct)
    {
        var groupApplications = await _smsDbContext.GroupApplications
            .Where(e => ids.Contains(e.Id))
            .ToListAsync(ct);

        return groupApplications;
    }
    
    public async Task<List<GroupApplication>> GetGroupApplicationsAsync(Guid groupId, CancellationToken ct)
    {
        var groupApplications = await _smsDbContext.GroupApplications.Where(e => e.GroupId == groupId).Include(e=>e.StudentContact).ToListAsync(ct);
        return groupApplications;
    }

    public async Task<List<GroupApplication>> GetGroupApplicationsByStudentIdsAndGroupIdAsync(List<Guid> studentIds, Guid groupId, CancellationToken ct)
    {
        var groupApplication = await _smsDbContext.GroupApplications
            .Where(e => studentIds.Contains(e.StudentContactId) && e.GroupId == groupId)
            .Include(e => e.StudentContact)
            .ToListAsync(ct);

        return groupApplication;
    }
}
