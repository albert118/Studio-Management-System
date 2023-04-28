using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.Mappers;
using StudioManagementSystem.ProjectManagement;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GroupApplicationController : ControllerBase
{
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;
    private readonly IGroupApplicationRepository _groupApplicationRepository;

    public GroupApplicationController(IGroupApplicationRepository groupApplicationRepository,
        ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _groupApplicationRepository = groupApplicationRepository;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }

    [HttpPost]
    public ActionResult<bool> AddGroupInvitation(InvitationDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupApplicationRepository.AddGroupApplication(dto, ct);

        task.Wait(ct);

        if (!task.Result)
            return StatusCode(500);

        return task.Result;
    }

    [HttpPatch()]
    public ActionResult<bool> ManageGroupApplication(ManageInvitationDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupApplicationRepository.ManageGroupInvitation(dto, ct);

        task.Wait(ct);

        if (!task.Result)
            return StatusCode(500);

        return task.Result;
    }
    
    [HttpGet("{id}")]
    public List<GroupApplicationDto> GetGroupApplication(Guid id)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _groupApplicationRepository.GetGroupApplicationsAsync(id, ct);
        task.Wait(ct);

        return task.Result.Select(g => g.MapToGroupApplicationDtoDto()).ToList();
    }
}
