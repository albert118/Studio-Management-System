using Microsoft.AspNetCore.Mvc;
using StudioManagementSystem.Core.Dtos;
using StudioManagementSystem.Infrastructure.Interfaces.Data;
using StudioManagementSystem.ProjectManagement;

namespace StudioManagementSystem.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentContactController : ControllerBase
{
    private readonly IStudentContactRepository _studentContactRepository;
    private readonly IProjectGroupManager _projectGroupManager;
    private readonly ICancellationTokenAccessor _cancellationTokenAccessor;

    public StudentContactController(IStudentContactRepository studentContactRepository, IProjectGroupManager projectGroupManager, ICancellationTokenAccessor cancellationTokenAccessor)
    {
        _studentContactRepository = studentContactRepository;
        _projectGroupManager = projectGroupManager;
        _cancellationTokenAccessor = cancellationTokenAccessor;
    }
    
    [HttpPost]
    public ActionResult<Guid> CreateStudentContact(CreateStudentContactDto dto)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _studentContactRepository.AddStudentContactAsync(new(dto), ct);
        task.Wait(ct);

        return task.Result;
    }
    
    [HttpPost("[action]/{id:guid}")]
    [ActionName("leavegroup")]
    public ActionResult LeaveAssignedGroup(Guid id)
    {
        var ct = _cancellationTokenAccessor.Token;
        var task = _projectGroupManager.LeaveAssignedGroupAsync(id, ct);
        task.Wait(ct);

        if (!task.Result)
            return StatusCode(500);

        return Ok();
    }
}
