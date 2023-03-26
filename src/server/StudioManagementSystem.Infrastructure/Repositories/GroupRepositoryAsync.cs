using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.DataServices;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class GroupRepositoryAsync : IGroupRepositoryAsync
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    
    public GroupRepositoryAsync(IStudioManagementSystemDbContextAsync smsDbContext)
    {
        _smsDbContext = smsDbContext;
    }
    
    public async Task<List<Group>> GetGroupsAsync(CancellationToken ct)
    {
        var groups = await _smsDbContext.Groups.ToListAsync(ct);
        return groups;
    }

    public async Task<Group?> GetGroupAsync(Guid id, CancellationToken ct)
    {
        var group = await _smsDbContext.Groups.FindAsync(id, ct);
        return group;
    }

    public async Task<Guid> AddGroupAsync(Group group, CancellationToken ct)
    {
        try
        {
            await _smsDbContext.Groups.AddAsync(group, ct);
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            return Guid.Empty;
        }

        return group.Id;
    }

    public async Task<Group?> UpdateGroupAsync(Guid id, Group group, CancellationToken ct)
    {
        var myGroup = await _smsDbContext.Groups.FindAsync(id, ct);
        try
        {
            myGroup.Name = group.Name;
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            return null;
        }

        return myGroup;
    }

}