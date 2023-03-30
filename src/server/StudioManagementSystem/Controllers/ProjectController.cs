using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectController : ControllerBase
{
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;
    private readonly IProjectRepository _projectRepository;

    public ProjectController(IProjectRepository projectRepository,
        ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _projectRepository = projectRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    [HttpGet]
    public List<ProjectDto> GetProjects()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectRepository.GetProjectsAsync(ct);
        task.Wait(ct);

        return task.Result.Select(p => p.MapToProjectDto()).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<ProjectDto> GetProject(Guid id)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectRepository.GetProjectAsync(id, ct);
        task.Wait(ct);

        if (task.Result == null)
            return NotFound();

        return task.Result.MapToProjectDto();
    }

    [HttpPost]
    public ActionResult<Guid> AddProject(Project project)
    {
        var ct = _cancellationTokenAccessor.Token;
        var myProject = new Project(project.Title, project.Description);
        var task = _projectRepository.AddProjectAsync(myProject, ct);
        task.Wait(ct);

        if (task.Result == Guid.Empty)
            return NotFound();
        return task.Result;
    }

    [HttpPatch("{id}")]
    public ActionResult UpdateProject(Guid id, Project project)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectRepository.UpdateProjectAsync(id, project.Title, project.Description, ct);
        task.Wait(ct);

        return task.Result ? Ok() : StatusCode(500);
    }
}
