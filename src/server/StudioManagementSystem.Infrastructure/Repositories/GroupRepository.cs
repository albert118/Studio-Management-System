using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using System.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class GroupRepository : IGroupRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    private readonly ILogger<GroupRepository> _logger;

    public GroupRepository(IStudioManagementSystemDbContextAsync smsDbContext, ILogger<GroupRepository> logger)
    {
        _smsDbContext = smsDbContext;
        _logger = logger;
    }
    
    public async Task<List<Group>> GetGroupsAsync(CancellationToken ct)
    {
        var groups = await _smsDbContext.Groups
            .Include(e => e.Members)
            .Include(e => e.GroupProjectPreferences)
            .ThenInclude(c => c.Project)
            .ToListAsync(ct);
        return groups;
    }

    public async Task<Group?> GetGroupAsync(Guid id, CancellationToken ct)
    {
        var group = await _smsDbContext.Groups
            .Include(e => e.Members)
            .Include(e => e.GroupProjectPreferences)
            .ThenInclude(c => c.Project)
            .FirstOrDefaultAsync(g => g.Id == id, ct);
        return group;
    }

    public async Task<Group?> GetGroupByNameAsync(string name, CancellationToken ct)
    {
        var group = await _smsDbContext.Groups
            .Include(e => e.Members)
            .FirstOrDefaultAsync(g => g.Name == name, ct);
        return group;
    }

    public async Task<Guid> AddGroupAsync(Group group, CancellationToken ct)
    {
        try {
            if (await GetGroupByNameAsync(group.Name, ct) != null) {
                throw new DataException($"Cannot create a {nameof(Group)} with an existing name, '{group.Name}");
            }

            await _smsDbContext.Groups.AddAsync(group, ct);
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An exception occured while creating a new {nameof(Group)}");
            return Guid.Empty;
        }

        return group.Id;
    }

    public async Task<bool> UpdateGroup(Guid id, Group updatedGroup, CancellationToken ct)
    {
        var group = await GetGroupAsync(id, ct)
            ?? throw new DataException($"Couldn't find {nameof(Group)} with ID: '{id}'");

        try {
            group.Name = updatedGroup.Name;
            group.Description = updatedGroup.Description;
            group.MaxMembers = updatedGroup.MaxMembers;
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An exception occured while updating a {Group} with id: '{Id}'", nameof(Group), id);
            return false;
        }

        return true;
    }

    public async Task<bool> AddGroupProjectPreferencesAsync(List<GroupProjectPreference> preferences, Group group, CancellationToken ct)
    {
        try {
            await _smsDbContext.GroupProjectPreferences.AddRangeAsync(preferences, ct);
            group.GroupProjectPreferences = preferences;
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An exception occured while adding {GroupProjectPreference}s to a {Group} with id: '{Id}'",
                nameof(GroupProjectPreference),
                nameof(Group),
                group.Id
            );
            return false;
        }

        return true;
    }
}
