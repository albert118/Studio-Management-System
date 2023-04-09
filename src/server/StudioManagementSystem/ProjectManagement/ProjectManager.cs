using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.ProjectManagement;


public interface IProjectManager
{
    Task<Guid> CreateNewProjectAsync(CreateProjectDto dto, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class ProjectManager : IProjectManager
{
    private readonly IProjectRepository _projectRepository;
    private readonly ILogger<ProjectManager> _logger;

    public ProjectManager(IProjectRepository projectRepository, ILogger<ProjectManager> logger)
    {
        _projectRepository = projectRepository;
        _logger = logger;
    }

    public async Task<Guid> CreateNewProjectAsync(CreateProjectDto dto, CancellationToken ct)
    {
        var newProject = new Project(dto.Title, dto.Description);
        var projectId = await _projectRepository.AddProjectAsync(newProject, ct);
        await AssignOwnersToProjectAsync(projectId, dto.OwnerContactIds, ct);
        return projectId;
    }

    // could be made public at a later date
    public async Task<bool> AssignOwnersToProjectAsync(Guid projectId, IEnumerable<Guid> ownerContactIds, CancellationToken ct)
    {
        return await _projectRepository.AssignOwnersToProjectAsync(projectId, ownerContactIds, ct);
    }
}
