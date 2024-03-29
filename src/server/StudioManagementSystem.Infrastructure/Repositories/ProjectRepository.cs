using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using System.Data;
using System.Runtime.ExceptionServices;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class ProjectRepository : IProjectRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    private readonly IOwnerContactRepository _ownerContactRepository;
    private readonly ILogger<ProjectRepository> _logger;

    public ProjectRepository(IStudioManagementSystemDbContextAsync smsDbContext, IOwnerContactRepository ownerContactRepository,
        ILogger<ProjectRepository> logger)
    {
        _smsDbContext = smsDbContext;
        _ownerContactRepository = ownerContactRepository;
        _logger = logger;
    }

    public async Task<List<Project>> GetProjectsAsync(CancellationToken ct)
    {
        var projects = await _smsDbContext.Projects
            .Include(e => e.PrincipalOwner)
            .Include(e => e.ProductOwners)
            .ToListAsync(ct);

        return projects;
    }

    public async Task<Project?> GetProjectAsync(Guid id, CancellationToken ct)
    {
        var project = await _smsDbContext.Projects
            .Include(e => e.PrincipalOwner)
            .Include(e => e.ProductOwners)
            .FirstOrDefaultAsync(p => p.Id == id, ct);

        return project;
    }

    public async Task<Project?> GetProjectByTitleAsync(string title, CancellationToken ct)
    {
        var project = await _smsDbContext.Projects.FirstOrDefaultAsync(g => g.Title == title, ct);
        return project;
    }

    public async Task<Guid> AddProjectAsync(Project project, CancellationToken ct)
    {
        if (await GetProjectByTitleAsync(project.Title, ct) != null) {
            throw new DataException($"Cannot create a {nameof(Project)} with an existing name, '{project.Title}");
        }

        Guid returnId;

        try {
            var principalOwner = (await _ownerContactRepository.GetOwnersByIdAsync(
                new List<Guid> { project.PrincipalOwnerId }, ct)
            ).FirstOrDefault();

            if (principalOwner is null) {
                throw new DataException($"Cannot assign a non-existent ${nameof(OwnerContact)} with id: '${project.PrincipalOwnerId}' as the principal owner to a ${nameof(Project)}");
            }

            project.PrincipalOwner = principalOwner;

            await _smsDbContext.Projects.AddAsync(project, ct);
            await _smsDbContext.SaveChangesAsync(ct);
            returnId = project.Id;
        } catch (Exception ex) {
            _logger.LogError(ex, "An exception occured while assigning the principal owner to a new {Project}", nameof(Project));

            if (ex is DataException) {
                ExceptionDispatchInfo.Capture(ex).Throw();
            }

            returnId = Guid.Empty;
        }

        return returnId;
    }

    public async Task<bool> UpdateProjectAsync(Guid id, string title, string description, CancellationToken ct)
    {
        try
        {
            var project = await GetProjectAsync(id, ct)
                      ?? throw new DataException($"Couldn't find {nameof(Project)} with ID: '{id}'");
            project.Title = title;
            project.Description = description;
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An exception occured while updating {Project} with id: '{Id}'", nameof(Project), id);
            return false;
        }

        return true;
    }

    public async Task<bool> AssignOwnersToProjectAsync(Guid id, IEnumerable<Guid> ownerContactIds, CancellationToken ct)
    {
        try {
            var project = await GetProjectAsync(id, ct)
                          ?? throw new DataException($"Couldn't find {nameof(Project)} with ID: '{id}'");
            var owners = await _ownerContactRepository.GetOwnersByIdAsync(ownerContactIds, ct);
            project.ProductOwners = owners;
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex) {
            _logger.LogError(ex, "An exception occured while assigning product owners to a {Project} with id: '{Id}'", nameof(Project), id);
            return false;
        }

        return true;
    }
}
