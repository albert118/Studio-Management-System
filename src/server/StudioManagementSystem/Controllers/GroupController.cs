﻿using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Entities;
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

        if (task.Result == null)
            return new List<Group>();
        return task.Result.ToList();
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
    public ActionResult<Guid> AddGroup(Group group)
    {
        var ct = _cancellationTokenAccessor.Token;
        var myGroup = new Group(group.Name);
        var task = _groupRepository.AddGroupAsync(myGroup, ct);

        if (task.Result == Guid.Empty)
            return NotFound();
        return task.Result;
    }

    [HttpPut("{id}")]
    public ActionResult<Group> UpdateGroup(Guid id, Group group)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupRepository.UpdateGroupAsync(id, group, ct);

        if (task.Result == null)
            return NotFound();
        return task.Result;
    }
    
}