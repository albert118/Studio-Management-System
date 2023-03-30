using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;

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
    public List<Project> GetProjects()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectRepository.GetProjectsAsync(ct);

        if (task.Result == null)
            return new List<Project>();
        return task.Result.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Project> GetProject(Guid id)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectRepository.GetProjectAsync(id, ct);

        if (task.Result == null)
            return NotFound();
        return task.Result;
    }

    [HttpPost]
    public ActionResult<Guid> AddProject(Project project)
    {
        var ct = _cancellationTokenAccessor.Token;
        var myProject = new Project(project.Title, project.Description);
        var task = _projectRepository.AddProjectAsync(myProject, ct);

        if (task.Result == Guid.Empty)
            return NotFound();
        return task.Result;
    }

    [HttpPut("{id}")]
    public ActionResult<Project> UpdateProject(Guid id, Project project)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectRepository.UpdateProjectAsync(id, project, ct);

        if (task.Result == null)
            return NotFound();
        return task.Result;
    }
    
}
