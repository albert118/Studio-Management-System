using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;
using StudioManagementSystem.ProjectManagement;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;
    private readonly IGroupRepository _groupRepository;
    private readonly IProjectGroupManager _projectGroupManager;

    public GroupController(IGroupRepository groupRepository, IProjectGroupManager projectGroupManager,
        ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _groupRepository = groupRepository;
        _projectGroupManager = projectGroupManager;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }
    
    [HttpGet("{id}")]
    public ActionResult<GroupDto> GetGroup(Guid id)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.GetGroupAsync(id, ct);
        task.Wait(ct);

        if (task.Result == null)
            return NotFound();

        return task.Result.MapToGroupDto();
    }

    [HttpPost]
    public ActionResult<Guid> AddGroup(CreateGroupDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectGroupManager.CreateNewGroupAsync(dto, ct);

        task.Wait(ct);

        if (task.Result == Guid.Empty)
            return StatusCode(500);

        return task.Result;
    }

    [HttpPost("{name}")]
    public ActionResult<bool> IsGroupNameTaken(string name)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.GetGroupByNameAsync(name, ct);
        task.Wait(ct);

        return task.Result != null;
    }

    [HttpPatch("{id}")]
    public ActionResult UpdateGroup(Guid id, UpdateGroupDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.UpdateGroup(id, new(dto), ct);
        task.Wait(ct);

        return task.Result ? Ok() : StatusCode(500);
    }
}
