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
        var existingApplicationsForStudents = await GetGroupApplicationsByStudentIdsAsync(dto.StudentIds.ToList(), ct);

        if (existingApplicationsForStudents is not null) {
            var num = existingApplicationsForStudents.Count;
            var plural = existingApplicationsForStudents.Count > 1 ? "s": string.Empty;
            var names = existingApplicationsForStudents.Select(app => app.StudentContact.GetFullName());
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
    
    public async Task<List<GroupApplication>> GetGroupApplicationAsync(Guid groupId, CancellationToken ct)
    {
        var groupApplication = await _smsDbContext.GroupApplications.Where(e => e.GroupId == groupId).Include(e=>e.StudentContact).ToListAsync(ct);
        return groupApplication;
    }

    public async Task<List<GroupApplication>> GetGroupApplicationsByStudentIdsAsync(List<Guid> studentIds, CancellationToken ct)
    {
        var groupApplication = await _smsDbContext.GroupApplications
            .Where(e => studentIds.Contains(e.StudentContactId))
            .Include(e => e.StudentContact)
            .ToListAsync(ct);

        return groupApplication;
    }
}
