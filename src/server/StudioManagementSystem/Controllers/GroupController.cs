using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Infrastructure.Interfaces.DataServices;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;
    private readonly IGroupRepository _groupRepository;

    public GroupController(IGroupRepository groupRepository,
        ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _groupRepository = groupRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    [HttpGet]
    public List<Group> GetGroups()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.GetGroupsAsync(ct);
        return task.Result;
    }

    [HttpGet("{id}")]
    public ActionResult<Group> GetGroup(Guid id)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.GetGroupAsync(id, ct);

        if (task.Result == null)
            return NotFound();

        return task.Result;
    }

    [HttpPost]
    public ActionResult<Guid> AddGroup(CreateGroupDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.AddGroupAsync(new(dto), ct);

        if (task.Result == Guid.Empty)
            return StatusCode(500);

        return task.Result;
    }

    [HttpPut("{id}")]
    public ActionResult UpdateGroup(Guid id, Group group)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.UpdateGroupNameAsync(id, group.Name, ct);
        return task.Result ? Ok() : StatusCode(500);
    }
}
