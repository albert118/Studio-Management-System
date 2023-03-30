using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using System.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class ProjectRepository : IProjectRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;
    private readonly ILogger<ProjectRepository> _logger;

    public ProjectRepository(IStudioManagementSystemDbContextAsync smsDbContext, ILogger<ProjectRepository> logger)
    {
        _smsDbContext = smsDbContext;
        _logger = logger;
    }

    public async Task<List<Project>> GetProjectsAsync(CancellationToken ct)
    {
        var projects = await _smsDbContext.Projects.ToListAsync(ct);
        return projects;
    }

    public async Task<Project?> GetProjectAsync(Guid id, CancellationToken ct)
    {
        var project = await _smsDbContext.Projects.FirstOrDefaultAsync(p => p.Id == id, ct);
        return project;
    }

    public async Task<Project?> GetProjectByTitleAsync(string title, CancellationToken ct)
    {
        var project = await _smsDbContext.Projects.FirstOrDefaultAsync(g => g.Title == title, ct);
        return project;
    }

    public async Task<Guid> AddProjectAsync(Project project, CancellationToken ct)
    {
        try
        {
            if (await GetProjectByTitleAsync(project.Title, ct) != null) {
                throw new DataException($"Cannot create a {nameof(Project)} with an existing name, '{project.Title}");
            }

            await _smsDbContext.Projects.AddAsync(project, ct);
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An exception occured while creating a new {nameof(Project)}");
            return Guid.Empty;
        }

        return project.Id;
    }

    public async Task<bool> UpdateProjectAsync(Guid id, string title, string description, CancellationToken ct)
    {
        var project = await GetProjectAsync(id, ct)
                    ?? throw new DataException($"Couldn't find {nameof(Project)} with ID: '{id}'");

        try
        {
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
    
}
