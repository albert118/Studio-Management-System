using Microsoft.EntityFrameworkCore;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.DataServices;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.Infrastructure.Repositories;

[InstanceScopedService]
public class ProjectRepository : IProjectRepository
{
    private readonly IStudioManagementSystemDbContextAsync _smsDbContext;

    public ProjectRepository(IStudioManagementSystemDbContextAsync smsDbContext)
    {
        _smsDbContext = smsDbContext;
    }

    public async Task<List<Project>> GetProjectsAsync(CancellationToken ct)
    {
        var projects = await _smsDbContext.Projects.ToListAsync(ct);
        return projects;
    }

    public async Task<Project?> GetProjectAsync(Guid id, CancellationToken ct)
    {
        var project = await _smsDbContext.Projects.FindAsync(id, ct);
        return project;
    }

    public async Task<Guid> AddProjectAsync(Project project, CancellationToken ct)
    {
        try
        {
            await _smsDbContext.Projects.AddAsync(project, ct);
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            return Guid.Empty;
        }

        return project.Id;
    }

    public async Task<Project?> UpdateProjectAsync(Guid id, Project project, CancellationToken ct)
    {
        var myProject = await _smsDbContext.Projects.FindAsync(id, ct);
        try
        {
            myProject.Title = project.Title;
            myProject.Description = project.Description;
            await _smsDbContext.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            return null;
        }

        return myProject;
    }
    
}
