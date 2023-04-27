using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class GroupApplicationRepository: IGroupApplicationRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    private readonly IGroupRepository _groupRepository;
    private readonly IStudentContactRepository _studentContactRepository;
    private readonly ILogger<GroupApplicationRepository> _logger;
    

    public GroupApplicationRepository(IStudioManagementSystemDbContextAsync smsDbContext,IGroupRepository groupRepository, IStudentContactRepository studentContactRepository, ILogger<GroupApplicationRepository> logger)
    {
        _smsDbContext = smsDbContext;
        _logger = logger;
        _groupRepository = groupRepository;
        _studentContactRepository = studentContactRepository;
    }
    
    public async Task<bool> AddGroupApplication(InvitationDto dto, CancellationToken ct)
    {
        List <GroupApplication> groupApplications= dto.StudentIds.Select(studentId => new GroupApplication() {StudentContactId = studentId, GroupId = dto.GroupId, Message = dto.Message}).ToList();

        try
        {
            await _smsDbContext.GroupApplications.AddRangeAsync(groupApplications, ct);
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
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
    
}