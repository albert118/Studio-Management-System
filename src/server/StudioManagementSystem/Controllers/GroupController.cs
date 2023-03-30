using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Core.Entities;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Infrastructure.Interfaces.DataServices;
using StudioManagementSystem.Mappers;

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
    public List<GroupDto> GetGroups()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.GetGroupsAsync(ct);
        task.Wait(ct);

        return task.Result.Select(g => g.MapToGroupDto()).ToList();
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
        var task = _groupRepository.AddGroupAsync(new(dto), ct);
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

    [HttpPut("{id}")]
    public ActionResult UpdateGroup(Guid id, Group group)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.UpdateGroupNameAsync(id, group.Name, ct);
        task.Wait(ct);

        return task.Result ? Ok() : StatusCode(500);
    }
}
