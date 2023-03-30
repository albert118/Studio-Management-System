using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.DataServices;
using System.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class GroupRepository : IGroupRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    
    public GroupRepository(IStudioManagementSystemDbContextAsync smsDbContext)
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
        var group = await _smsDbContext.Groups.FirstOrDefaultAsync(g => g.Id == id, ct);
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

    public async Task<Group?> UpdateGroupNameAsync(Guid id, string name, CancellationToken ct)
    {
        var group = await GetGroupAsync(id, ct)
            ?? throw new DataException($"Couldn't find {nameof(Group)} with ID: '{id}'");

        try
        {
            group.Name = name;
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            return null;
        }

        return group;
    }

}
