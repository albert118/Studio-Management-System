using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;
    private readonly IProjectRepository _projectRepository;

    public ProjectsController(IProjectRepository projectRepository,
        ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _projectRepository = projectRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    [HttpGet("[action]")]
    [ActionName("all")]
    public List<ProjectDto> GetProjects()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectRepository.GetProjectsAsync(ct);
        task.Wait(ct);

        return task.Result.Select(p => p.MapToProjectDto()).ToList();
    }
}
