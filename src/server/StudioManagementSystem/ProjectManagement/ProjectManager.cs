using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

namespace StudioManagementSystem.ProjectManagement;

public interface IProjectManager
{
    Task<Guid> CreateNewProjectAsync(Project project, Guid principalOwner, List<Guid> owners, CancellationToken ct);
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

    public async Task<Guid> CreateNewProjectAsync(Project project, Guid principalOwner, List<Guid> owners, CancellationToken ct)
    {
        var projectId = await _projectRepository.AddProjectAsync(project, ct);
        await AssignPrincipalOwnerToProjectAsync(projectId, principalOwner, ct);
        await AssignOwnersToProjectAsync(projectId, owners, ct);
        return projectId;
    }

    public async Task<bool> AssignPrincipalOwnerToProjectAsync(Guid projectId, Guid principalOwnerContactId, CancellationToken ct)
    {
        return await _projectRepository.AssignPrincipalOwnerAsync(projectId, principalOwnerContactId, ct);
    }

    public async Task<bool> AssignOwnersToProjectAsync(Guid projectId, IEnumerable<Guid> ownerContactIds, CancellationToken ct)
    {
        return await _projectRepository.AssignOwnersToProjectAsync(projectId, ownerContactIds, ct);
    }
}
