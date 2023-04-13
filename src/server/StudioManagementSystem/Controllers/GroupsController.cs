using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GroupsController : ControllerBase
{
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;
    private readonly IGroupRepository _groupRepository;

    public GroupsController(IGroupRepository groupRepository,
        ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _groupRepository = groupRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    [HttpGet("[action]")]
    [ActionName("all")]
    public List<GroupDto> GetGroups()
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.GetGroupsAsync(ct);
        task.Wait(ct);

        return task.Result.Select(g => g.MapToGroupDto()).ToList();
    }
}
