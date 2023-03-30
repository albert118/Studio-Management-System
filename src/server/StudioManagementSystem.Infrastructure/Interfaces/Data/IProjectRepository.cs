using StudioManagementSystem.Core.Entities;

namespace StudioManagementSystem.Infrastructure.Interfaces.Data;

public interface IProjectRepository
{
    Task<List<Project>> GetProjectsAsync(CancellationToken ct);
    Task<Project?> GetProjectAsync(Guid id, CancellationToken ct);
    Task<Guid> AddProjectAsync(Project project, CancellationToken ct);
    Task<Project?> UpdateProjectAsync(Guid id, Project project, CancellationToken ct);

}
